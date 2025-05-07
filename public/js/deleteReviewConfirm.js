// deleteReviewConfirm.js



document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-review-form');
  
    deleteForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent immediate form submission
  
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this review!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e76f51', // Match your site's orange
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          background: '#fff',
          customClass: {
            popup: 'animated-popup'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            form.submit(); // Submit the form if confirmed
          }
        });
      });
    });
  });
    // Auto-hide flash messages after 3 seconds
    setTimeout(() => {
    const flashMessages = document.querySelectorAll('.flash');
    flashMessages.forEach(flash => {
      flash.style.transition = "opacity 0.5s ease";
      flash.style.opacity = "0";
      setTimeout(() => {
        flash.remove(); // Optional: fully remove after fade out
      }, 500);
    });
  }, 10000); 