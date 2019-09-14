import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core'

declare var $: any

@Directive({
    selector: '[summernote]',
})
export class SummernoteDirective implements OnInit {
    @Input() summernote = {
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear', '']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['style', 'ul', 'ol', 'paragraph']],
            ['fullscreen'],
            ['codeview'],
            ['fontname', ['fontname']],
        ],
    }
    @Output() change = new EventEmitter()
    @Output() blur = new EventEmitter()
    @Input() text: string

    constructor(private el: ElementRef) {}

    ngOnInit() {
        System.import('script-loader!summernote/dist/summernote.min.js').then(() => {
            this.render()
        })
    }

    render() {
        $(this.el.nativeElement).summernote(
            Object.assign(this.summernote, {
                tabsize: 2,
                callbacks: {
                    onChange: (contents, $editable) => {
                        this.change.emit(contents)
                    },
                    onBlur: () => {
                        this.blur.emit()
                    },
                },
            }),
        )
        $(this.el.nativeElement).summernote('code', this.text)
    }
}
