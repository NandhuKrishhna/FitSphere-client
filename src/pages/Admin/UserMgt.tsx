import type React from "react"

interface BlockUserPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

const BlockUserPopup: React.FC<BlockUserPopupProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Block User</h2>
        <p className="mb-6 text-gray-300">
          Are you sure you want to block {userName}? This action can be undone later.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlockUserPopup

