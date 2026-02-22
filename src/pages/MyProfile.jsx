import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearSuccess, clearError } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUserCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, success, error } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contactNumber: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        contactNumber: user.contactNumber || '',
        dob: user.dob ? user.dob.split('T')[0] : '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully!');
      setEditing(false);
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.contactNumber || !/^[0-9]{10}$/.test(form.contactNumber)) e.contactNumber = 'Enter a valid 10-digit number';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    dispatch(updateProfile(form));
  };

  const handleCancel = () => {
    setEditing(false);
    setErrors({});
    setForm({
      name: user.name || '',
      contactNumber: user.contactNumber || '',
      dob: user.dob ? user.dob.split('T')[0] : '',
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    } ${!editing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-light mt-1 text-sm">View and manage your personal information</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Avatar Banner */}
          <div className="bg-gradient-to-r from-primary to-secondary h-28 flex items-end px-8 pb-0 relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center border-4 border-white shadow-lg">
                <FaUserCircle size={48} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="pt-14 px-8 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <FaEdit size={13} /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <FaTimes size={13} /> Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email — Non-editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                  disabled={!editing}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={form.contactNumber}
                  onChange={(e) => { setForm({ ...form, contactNumber: e.target.value }); setErrors({ ...errors, contactNumber: '' }); }}
                  disabled={!editing}
                  className={inputClass('contactNumber')}
                />
                {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  disabled={!editing}
                  className={inputClass('dob')}
                />
              </div>

              {editing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaSave size={14} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyProfile;