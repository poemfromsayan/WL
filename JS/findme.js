// findMeJob.js - CV Submission Form Handling

class FindMeJobPage {
    constructor() {
        this.form = null;
        this.successMessage = null;
        this.init();
    }

    init() {
        this.animateEntrance();
        this.initializeForm();
        this.setupFileUpload();
        console.log('Find Me a Job page initialized');
    }

    animateEntrance() {
        const page = document.querySelector('.findMeJobPage');
        if (page) {
            setTimeout(() => {
                page.classList.add('loaded');
            }, 100);
        }
    }

    initializeForm() {
        this.form = document.getElementById('cvSubmissionForm');
        this.successMessage = document.getElementById('successMessage');

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    setupFileUpload() {
        const fileInput = document.getElementById('cvUpload');
        const fileUploadText = document.querySelector('.file-upload-text');

        if (fileInput && fileUploadText) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validate file size (5MB max)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        fileInput.value = '';
                        fileUploadText.textContent = 'Choose file';
                        return;
                    }

                    // Validate file type
                    const allowedTypes = ['.pdf', '.doc', '.docx'];
                    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                    
                    if (!allowedTypes.includes(fileExtension)) {
                        alert('Please upload a PDF, DOC, or DOCX file');
                        fileInput.value = '';
                        fileUploadText.textContent = 'Choose file';
                        return;
                    }

                    fileUploadText.textContent = file.name;
                }
            });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // Basic validation
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            this.resetFileUpload();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Here you would typically:
            // 1. Send form data to your server/API
            // 2. Handle the file upload
            // 3. Show success/error message based on response
            
            console.log('Form submitted with data:', this.getFormData());
            
        }, 1500);
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField.value && !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.style.borderColor = '#e74c3c';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '#e1e8ed';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    showSuccessMessage() {
        if (this.form && this.successMessage) {
            this.form.classList.add('hidden');
            this.successMessage.classList.remove('hidden');
            
            // Scroll to success message
            this.successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }

    resetFileUpload() {
        const fileUploadText = document.querySelector('.file-upload-text');
        if (fileUploadText) {
            fileUploadText.textContent = 'Choose file';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new FindMeJobPage();
});