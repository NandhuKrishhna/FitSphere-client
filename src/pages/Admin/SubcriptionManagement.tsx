import { PlusCircle, Pencil, Trash2, X, Check, Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { ISubscription } from "@/types/api/admin-api-types"
import useSubscriptionManagement from "@/hooks/Admin/useSubscriptionManagement"

export type PlanType = "basic" | "premium" | "enterprise"
export default function SubscriptionManagement() {
    const {
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
        setIsDeleteDialogOpen,
        setFeatureInput

    } = useSubscriptionManagement();

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <Navigation />
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Subscription Plans Management</h1>
                    <Button onClick={handleCreate} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                        <PlusCircle className="h-4 w-4" />
                        Add New Plan
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptionPlans?.subscriptionPlan.map((plan: ISubscription) => (
                        <Card key={plan._id} className="overflow-hidden border-indigo-800 bg-gray-900">
                            <CardHeader className="bg-gray-800">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge className="mb-2 bg-indigo-600 hover:bg-indigo-700">{plan.type}</Badge>
                                        <CardTitle>{plan.planName}</CardTitle>
                                    </div>
                                    <div className="text-xl font-bold text-indigo-400">₹{plan.price.toFixed(2)}</div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Features:</h3>
                                    <ul className="space-y-1">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-indigo-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(plan)}
                                        className="border-indigo-600 text-indigo-400 hover:bg-indigo-950 hover:text-indigo-300"
                                    >
                                        <Pencil className="h-4 w-4 mr-1" /> Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteClick(plan)}
                                        className="bg-red-900 hover:bg-red-800 text-white"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Form Dialog */}
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogContent className="sm:max-w-[500px] bg-gray-900 border-indigo-800">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                {isEditing ? "Edit Subscription Plan" : "Create Subscription Plan"}
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                {isEditing
                                    ? "Update the details of the subscription plan."
                                    : "Fill in the details to create a new subscription plan."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="planName" className="text-white">
                                    Plan Name
                                </Label>
                                <Input
                                    id="planName"
                                    name="planName"
                                    value={formData.planName}
                                    onChange={handleInputChange}
                                    placeholder="Enter plan name"
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type" className="text-white">
                                    Plan Type
                                </Label>
                                <Select value={formData.type} onValueChange={handleTypeChange}>
                                    <SelectTrigger id="type" className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Select plan type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                        <SelectItem value="basic">Basic</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-white">
                                    Price (₹)
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="1"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-white">Features</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        placeholder="Add a feature"
                                        className="bg-gray-800 border-gray-700 text-white"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                addFeature()
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={addFeature}
                                        variant="secondary"
                                        className="bg-indigo-700 hover:bg-indigo-600 text-white"
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    {formData.features.map((feature, index) => (
                                        <Badge key={index} className="mr-2 mb-2 pr-1 bg-indigo-800 text-white">
                                            {feature}
                                            <button onClick={() => removeFeature(index)} className="ml-1 hover:text-red-400">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsFormOpen(false)}
                                className="border-indigo-600 text-indigo-400 hover:bg-indigo-950 hover:text-indigo-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!formData.planName || formData.price <= 0 || formData.features.length === 0}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {isAddSubscriptionLoading || isEditSubscriptionLoading ? <Loader className="animate-spin" size={15} /> : "Save"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent className="bg-gray-900 border-indigo-800">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                This will permanently delete the "{currentPlan?.planName}" subscription plan. This action cannot be
                                undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleDelete(currentPlan?._id)}
                                className="bg-red-900 hover:bg-red-800 text-white"
                            >
                                {isDeleteSubscriptionLoading ? <Loader className="animate-spin" size={15} /> : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}