import { useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "../types/tour";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourTitle: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  tourTitle,
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    addOns: "",
    numberOfTickets: 1,
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Partial<BookingForm> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email !== formData.confirmEmail)
      newErrors.confirmEmail = "Emails don't match";
    if (!formData.phone) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    const bookingData = {
      ...formData,
      tourTitle,
      bookingDate: new Date().toISOString(),
      bookingId: `BOOK-${Date.now()}`,
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("tourBookings") || "[]",
    );
    existingBookings.push(bookingData);
    localStorage.setItem("tourBookings", JSON.stringify(existingBookings));

    alert(
      "Booking submitted successfully! Your booking details have been saved.",
    );
    onClose();

    // Reset form
    setFormData({
      name: "",
      email: "",
      confirmEmail: "",
      phone: "",
      addOns: "",
      numberOfTickets: 1,
      additionalInfo: "",
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book This Tour</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Ex officio sequi et quos praesentium in nostrum labore nam rerum
            iusto aut magni nesciunt? Quo quidem neque iste expedita est dolor.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Confirm Email"
                value={formData.confirmEmail}
                onChange={(e) =>
                  setFormData({ ...formData, confirmEmail: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {errors.confirmEmail && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmEmail}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Add-ons"
                value={formData.addOns}
                onChange={(e) =>
                  setFormData({ ...formData, addOns: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Number of tickets"
                min="1"
                value={formData.numberOfTickets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfTickets: parseInt(e.target.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <textarea
                placeholder="Additional information or special requests..."
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
