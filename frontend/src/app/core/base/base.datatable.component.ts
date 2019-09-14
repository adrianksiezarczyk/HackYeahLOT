import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core'
import { BaseComponent } from './base.component'
import { PaginationRequestModel, PaginationResponseModel } from './models'

export abstract class BaseDatatableComponent<TRequest, TResponse> extends BaseComponent implements OnInit {
    static requestCache: any = null

    init(): void {}
    ngOnInit(): void {}

    checkedAll: boolean
    selectedItem: TResponse = <TResponse>{}
    orderColumn: string
    isDesc: boolean
    orderRuleClass = ''
    itemsPerPage: number = 10
    request: PaginationRequestModel<TRequest> = <PaginationRequestModel<TRequest>>{
        currentPage: 1,
        pageSize: 10,
        filter: {},
    }
    response: PaginationResponseModel<TResponse> = <PaginationResponseModel<TResponse>>{ data: [] }

    pageChange(event) {
        this.request.currentPage = event.currentPage
        this.itemsPerPage = this.request.pageSize = event.itemsPerPage
        BaseDatatableComponent.requestCache = this.request
        this.ngOnInit()
        this.init()
    }

    checkAll() {
        this.response.data.forEach(p => ((<any>p).checked = !this.checkedAll))
    }
    isAnyChecked() {
        return this.response.data.find(p => (<any>p).checked) != null
    }

    setOrder(event) {
        const name = event.target.attributes.name
        if (!name) return

        event.target
            .closest('thead')
            .querySelectorAll('.orderable.active')
            .forEach(e => {
                e.classList.remove('active')
                e.closest('td').classList.remove('active')
            })

        event.target.closest('td').classList.add('active')
        event.target.classList.add('active')

        if (this.orderColumn == name.value) this.isDesc = !this.isDesc
        else {
            this.orderColumn = name.value
            this.isDesc = false
        }
        this.orderRuleClass = `fa fa-arrow-${this.isDesc ? 'down' : 'up'}`
        this.request.sortColumnName = this.orderColumn
        this.request.sortOrder = this.isDesc ? 'desc' : 'asc'
        BaseDatatableComponent.requestCache = this.request

        this.ngOnInit()
        this.init()
    }
}
