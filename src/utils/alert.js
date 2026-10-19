import Swal from 'sweetalert2';

/**
 * Returns whether current app mode is dark theme
 */
const getIsDark = () => {
  return document.documentElement.getAttribute('data-theme') === 'dark';
};

/**
 * Custom Theme-Aware SweetAlert Alert
 */
export const showAlert = ({ 
  title, 
  text, 
  icon = 'info', 
  confirmButtonText = 'OK' 
}) => {
  const isDark = getIsDark();
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    confirmButtonColor: '#2563eb',
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f8fafc' : '#0f172a',
    customClass: {
      popup: 'resunova-swal-popup',
      title: 'resunova-swal-title',
      htmlContainer: 'resunova-swal-text',
      confirmButton: 'resunova-swal-btn resunova-swal-confirm-btn',
      cancelButton: 'resunova-swal-btn resunova-swal-cancel-btn'
    }
  });
};

/**
 * Custom Theme-Aware SweetAlert Confirmation Dialog
 */
export const showConfirm = async ({ 
  title, 
  text, 
  icon = 'warning', 
  confirmButtonText = 'Yes, Proceed', 
  cancelButtonText = 'Cancel',
  isDanger = false
}) => {
  const isDark = getIsDark();
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: isDanger ? '#e11d48' : '#2563eb',
    cancelButtonColor: isDark ? '#334155' : '#94a3b8',
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f8fafc' : '#0f172a',
    customClass: {
      popup: 'resunova-swal-popup',
      title: 'resunova-swal-title',
      htmlContainer: 'resunova-swal-text',
      confirmButton: `resunova-swal-btn ${isDanger ? 'resunova-swal-danger-btn' : 'resunova-swal-confirm-btn'}`,
      cancelButton: 'resunova-swal-btn resunova-swal-cancel-btn'
    }
  });
  return result.isConfirmed;
};

/**
 * Custom Theme-Aware SweetAlert Toast Notification
 */
export const showSwalToast = ({ title, icon = 'success', timer = 2500 }) => {
  const isDark = getIsDark();
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f8fafc' : '#0f172a',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  return Toast.fire({ icon, title });
};

export default Swal;
