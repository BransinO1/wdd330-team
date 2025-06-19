// productComments.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

const COMMENTS_STORAGE_KEY = "so-product-comments";

// Main function to initialize comments system for a product
export function initProductComments(productId) {
  createCommentsSection();
  displayComments(productId);
  setupCommentForm(productId);
}

// Create the comments section HTML
function createCommentsSection() {
  const commentsSection = document.createElement('section');
  commentsSection.className = 'product-comments';
  commentsSection.innerHTML = `
    <div class="comments-container">
      <h3 class="comments-title">Customer Reviews</h3>
      
      <!-- Comment Form -->
      <div class="comment-form-container">
        <h4>Write a Review</h4>
        <form id="commentForm" class="comment-form">
          <div class="form-group">
            <label for="reviewerName">Name *</label>
            <input type="text" id="reviewerName" name="reviewerName" required maxlength="50">
          </div>
          
          <div class="form-group">
            <label for="rating">Rating *</label>
            <div class="rating-input">
              <input type="radio" id="star5" name="rating" value="5" required>
              <label for="star5" title="5 stars">★</label>
              <input type="radio" id="star4" name="rating" value="4">
              <label for="star4" title="4 stars">★</label>
              <input type="radio" id="star3" name="rating" value="3">
              <label for="star3" title="3 stars">★</label>
              <input type="radio" id="star2" name="rating" value="2">
              <label for="star2" title="2 stars">★</label>
              <input type="radio" id="star1" name="rating" value="1">
              <label for="star1" title="1 star">★</label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="commentText">Review *</label>
            <textarea id="commentText" name="commentText" required maxlength="500" 
                      placeholder="Share your experience with this product..."></textarea>
            <small class="char-counter">0/500 characters</small>
          </div>
          
          <button type="submit" class="submit-comment-btn">Submit Review</button>
        </form>
      </div>
      
      <!-- Comments Display -->
      <div class="comments-list" id="commentsList">
        <!-- Comments will be inserted here -->
      </div>
    </div>
  `;
  
  // Insert after recommendations section, or after product detail if no recommendations
  const recommendationsSection = document.querySelector('.product-recommendations');
  const productDetailSection = document.querySelector('.product-detail');
  
  if (recommendationsSection) {
    recommendationsSection.parentNode.insertBefore(commentsSection, recommendationsSection.nextSibling);
  } else if (productDetailSection) {
    productDetailSection.parentNode.insertBefore(commentsSection, productDetailSection.nextSibling);
  }
}

// Setup comment form submission
function setupCommentForm(productId) {
  const form = document.getElementById('commentForm');
  const textarea = document.getElementById('commentText');
  const charCounter = document.querySelector('.char-counter');
  
  // Character counter
  textarea.addEventListener('input', () => {
    const length = textarea.value.length;
    charCounter.textContent = `${length}/500 characters`;
    charCounter.className = length > 450 ? 'char-counter warning' : 'char-counter';
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleCommentSubmission(productId, form);
  });
  
  // Rating interaction
  setupRatingInteraction();
}

// Handle rating star interaction
function setupRatingInteraction() {
  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  const ratingLabels = document.querySelectorAll('.rating-input label');
  
  ratingLabels.forEach((label, index) => {
    label.addEventListener('mouseover', () => {
      highlightStars(5 - index);
    });
    
    label.addEventListener('mouseout', () => {
      const checkedRating = document.querySelector('input[name="rating"]:checked');
      if (checkedRating) {
        highlightStars(parseInt(checkedRating.value));
      } else {
        clearStarHighlight();
      }
    });
    
    label.addEventListener('click', () => {
      ratingInputs[index].checked = true;
      highlightStars(5 - index);
    });
  });
}

// Highlight rating stars
function highlightStars(rating) {
  const labels = document.querySelectorAll('.rating-input label');
  labels.forEach((label, index) => {
    if (5 - index <= rating) {
      label.classList.add('highlighted');
    } else {
      label.classList.remove('highlighted');
    }
  });
}

// Clear star highlight
function clearStarHighlight() {
  const labels = document.querySelectorAll('.rating-input label');
  labels.forEach(label => label.classList.remove('highlighted'));
}

// Handle comment form submission
function handleCommentSubmission(productId, form) {
  const formData = new FormData(form);
  const comment = {
    id: generateCommentId(),
    productId: productId,
    reviewerName: formData.get('reviewerName').trim(),
    rating: parseInt(formData.get('rating')),
    commentText: formData.get('commentText').trim(),
    timestamp: new Date().toISOString(),
    displayDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  
  // Validate comment
  if (!validateComment(comment)) {
    return;
  }
  
  // Save comment
  saveComment(comment);
  
  // Reset form
  form.reset();
  clearStarHighlight();
  document.querySelector('.char-counter').textContent = '0/500 characters';
  
  // Refresh comments display
  displayComments(productId);
  
  // Show success message
  showSuccessMessage();
}

// Validate comment data
function validateComment(comment) {
  if (!comment.reviewerName || comment.reviewerName.length < 2) {
    alert('Please enter a valid name (at least 2 characters)');
    return false;
  }
  
  if (!comment.rating || comment.rating < 1 || comment.rating > 5) {
    alert('Please select a rating');
    return false;
  }
  
  if (!comment.commentText || comment.commentText.length < 10) {
    alert('Please enter a review with at least 10 characters');
    return false;
  }
  
  return true;
}

// Save comment to storage
function saveComment(comment) {
  const comments = getLocalStorage(COMMENTS_STORAGE_KEY) || [];
  comments.push(comment);
  setLocalStorage(COMMENTS_STORAGE_KEY, comments);
}

// Display all comments for a product
function displayComments(productId) {
  const comments = getLocalStorage(COMMENTS_STORAGE_KEY) || [];
  const productComments = comments
    .filter(comment => comment.productId === productId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  const commentsList = document.getElementById('commentsList');
  
  if (productComments.length === 0) {
    commentsList.innerHTML = `
      <div class="no-comments">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    `;
    return;
  }
  
  // Calculate average rating
  const averageRating = calculateAverageRating(productComments);
  
  // Render comments summary
  const summaryHtml = `
    <div class="comments-summary">
      <div class="rating-summary">
        <div class="average-rating">
          <span class="rating-number">${averageRating.toFixed(1)}</span>
          <div class="rating-stars">${renderStars(averageRating)}</div>
        </div>
        <span class="review-count">(${productComments.length} review${productComments.length === 1 ? '' : 's'})</span>
      </div>
    </div>
  `;
  
  // Render individual comments
  const commentsHtml = productComments.map(comment => renderComment(comment)).join('');
  
  commentsList.innerHTML = summaryHtml + commentsHtml;
}

// Calculate average rating
function calculateAverageRating(comments) {
  if (comments.length === 0) return 0;
  const sum = comments.reduce((total, comment) => total + comment.rating, 0);
  return sum / comments.length;
}

// Render star rating display
function renderStars(rating, interactive = false) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let starsHtml = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star filled">★</span>';
  }
  
  // Half star
  if (hasHalfStar) {
    starsHtml += '<span class="star half">★</span>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<span class="star empty">★</span>';
  }
  
  return starsHtml;
}

// Render individual comment
function renderComment(comment) {
  return `
    <div class="comment-item">
      <div class="comment-header">
        <div class="reviewer-info">
          <span class="reviewer-name">${escapeHtml(comment.reviewerName)}</span>
          <div class="comment-rating">${renderStars(comment.rating)}</div>
        </div>
        <span class="comment-date">${comment.displayDate}</span>
      </div>
      <div class="comment-text">
        ${escapeHtml(comment.commentText).replace(/\n/g, '<br>')}
      </div>
    </div>
  `;
}

// Utility functions
function generateCommentId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showSuccessMessage() {
  const existingMessage = document.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const message = document.createElement('div');
  message.className = 'success-message';
  message.textContent = 'Review submitted successfully!';
  
  const form = document.getElementById('commentForm');
  form.parentNode.insertBefore(message, form);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Export function to get comments count for a product (useful for product cards)
export function getCommentsCount(productId) {
  const comments = getLocalStorage(COMMENTS_STORAGE_KEY) || [];
  return comments.filter(comment => comment.productId === productId).length;
}

// Export function to get average rating for a product
export function getAverageRating(productId) {
  const comments = getLocalStorage(COMMENTS_STORAGE_KEY) || [];
  const productComments = comments.filter(comment => comment.productId === productId);
  return calculateAverageRating(productComments);
}