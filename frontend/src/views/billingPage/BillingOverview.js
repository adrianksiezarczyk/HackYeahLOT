import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Grid } from 'tabler-react'
import SubscriptionApi from '../../services/subscription/api'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import FeaturesView from './billingOverview/FeaturesView'
import CurrentPlanView from './billingOverview/CurrentPlanView'
import SelectingPlanTable from './billingOverview/SelectingPlanTable'
import useModal from '../../components/hooks/useModal';

const PaymentModal = lazy(() => import('./PaymentModal'))

const BillingOverview = props => {
    const [isLoading, setLoading] = useState(false)
    const [plans, setPlans] = useState(null)
    const [currentPlanInfo, setCurrentPlanInfo] = useState({})
    const [selectedPlanId, setSelectedPlanId] = useState(null)

    const { t } = props

    const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()

    useEffect(() => {
        setLoading(true)
        const getSubscriptions = async () => {
            try {
                const response = await SubscriptionApi.get()
                setPlans(response.plans)
                setCurrentPlanInfo({
                    isTrialPlan: response.isTrialPlan,
                    planValidityDateFrom: response.planValidityDateFrom,
                    planValidityDateTo: response.planValidityDateTo,
                })
                var currentPlan = response.plans.find(p => p.isSelected)
                if (!currentPlan) return
                setSelectedPlanId(currentPlan.id)
            } catch (e) {}
            setLoading(false)
        }
        getSubscriptions()
    }, [])

    const getCurrentPlan = () => {
        var plan = plans.find(p => p.isSelected)
        if (!plan) return null
        return plan
    }

    if (isLoading || !plans) return <LoadingIndicator />
    const currentPlan = getCurrentPlan()
    return (
        <Grid>
            <CurrentPlanView t={t} currentPlan={currentPlan} currentPlanInfo={currentPlanInfo} />
            <SelectingPlanTable
                t={t}
                plans={plans.filter(p => p.price >= currentPlan.price)}
                selectedPlanId={selectedPlanId}
                currentPlan={currentPlan}
                setSelectedPlanId={setSelectedPlanId}
                payForPlan={openModal}
            />
            <FeaturesView t={t} plans={plans.filter(p => p.price > currentPlan.price)} />
            <Suspense fallback={<LoadingIndicator />}>
                <PaymentModal
                    size="md"
                    isOpen={isModalOpen}
                    onCloseModal={closeModal}
                    planId={selectedPlanId}
                    t={t}
                    push={props.history.push}
                />
            </Suspense>
        </Grid>
    )
}

export default BillingOverview
