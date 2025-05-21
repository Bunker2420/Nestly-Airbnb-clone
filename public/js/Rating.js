  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  const poorFeedback = document.getElementById('poor-rating-feedback');

  ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
      const selectedRating = parseInt(document.querySelector('input[name="rating"]:checked').value);
      if (selectedRating > 0 && selectedRating <= 5) {
        poorFeedback.style.display = 'block';
      } else {
        poorFeedback.style.display = 'none';
      }
    });
  });

