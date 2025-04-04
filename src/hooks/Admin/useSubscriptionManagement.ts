import { PlanType } from "@/pages/Admin/SubcriptionManagement";
import { useGetAllSubcriptionQuery } from "@/redux/api/adminApi";
import useEditSubscription from "./useEditSubscription";
import useDeleteSubcription from "./useDeleteSubscription";
import useCreateSubscription from "./useCreateSubscription";
import { useState } from "react";
import { ISubscription } from "@/types/api/admin-api-types";




const useSubscriptionManagement = () => {
    const { data: subscriptionPlans } = useGetAllSubcriptionQuery(undefined)
    const { handleAddSubscription, isAddSubscriptionLoading } = useCreateSubscription();
    const { handleEditSubscription, isEditSubscriptionLoading } = useEditSubscription();
    const { handleDeleteSubscription, isDeleteSubscriptionLoading } = useDeleteSubcription();

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<ISubscription | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState<ISubscription>({
        _id: '',
        planName: "",
        type: "basic",
        price: 0,
        features: [],
    })

    const [featureInput, setFeatureInput] = useState("")


    const resetForm = () => {
        setFormData({
            _id: '',
            planName: "",
            type: "basic",
            price: 0,
            features: [],
        })
        setFeatureInput("")
    }


    const handleCreate = () => {
        setIsEditing(false)
        resetForm()
        setIsFormOpen(true)
    }


    const handleEdit = (plan: ISubscription) => {
        setIsEditing(true)
        setFormData({
            _id: plan._id,
            planName: plan.planName,
            type: plan.type,
            price: plan.price,
            features: [...plan.features],
        })
        setCurrentPlan(plan)
        setIsFormOpen(true)
    }

    const handleDeleteClick = (plan: ISubscription) => {
        setCurrentPlan(plan)
        setIsDeleteDialogOpen(true)
    }

    const handleDelete = (id: string | undefined) => {
        if (!id) return;
        handleDeleteSubscription(id)
    }
    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()],
            })
            setFeatureInput("")
        }
    }
    const removeFeature = (index: number) => {
        const updatedFeatures = [...formData.features]
        updatedFeatures.splice(index, 1)
        setFormData({
            ...formData,
            features: updatedFeatures,
        })
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
        })
    }

    const handleTypeChange = (value: string) => {
        setFormData({
            ...formData,
            type: value as PlanType,
        })
    }


    const handleSave = () => {
        if (isEditing && currentPlan) {

            handleEditSubscription({
                ...formData,
                _id: currentPlan._id,
            });
        } else {

            handleAddSubscription(formData);
        }
        setIsFormOpen(false)
        resetForm()
    }
    return {
        subscriptionPlans,
        isAddSubscriptionLoading,
        isEditSubscriptionLoading,
        isDeleteSubscriptionLoading,
        isFormOpen,
        isDeleteDialogOpen,
        currentPlan,
        isEditing,
        formData,
        featureInput,
        handleCreate,
        handleEdit,
        handleDeleteClick,
        handleDelete,
        addFeature,
        removeFeature,
        handleInputChange,
        handleTypeChange,
        handleSave,
        setIsFormOpen,
        setFeatureInput,
        setIsDeleteDialogOpen
    }

};
export default useSubscriptionManagement;