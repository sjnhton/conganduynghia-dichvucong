/**
 * Công an xã Duy Nghĩa - Landing Page Scripts
 * Author: Trần Duy
 */

document.addEventListener('DOMContentLoaded', function() {
    initFeedbackForm();
    initSmoothScroll();
    initAnimations();
});

/**
 * Initialize Feedback Form
 */
function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    
    if (!form) return;
    
    // Set default date to today
    const dateInput = document.getElementById('procedureDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            procedureDate: document.getElementById('procedureDate').value,
            procedureType: document.getElementById('procedureType').value,
            notes: document.getElementById('notes').value.trim()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Log form data to console
        console.log('=== PHẢN ÁNH MỚI ===');
        console.log('Họ và Tên:', formData.fullName);
        console.log('Số điện thoại:', formData.phoneNumber);
        console.log('Ngày thực hiện:', formData.procedureDate);
        console.log('Thủ tục:', getProcedureName(formData.procedureType));
        console.log('Ghi chú:', formData.notes || '(Không có)');
        console.log('====================');
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Reset date to today
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
    });
}

/**
 * Validate form data
 */
function validateForm(data) {
    // Check required fields
    if (!data.fullName) {
        alert('Vui lòng nhập họ và tên!');
        document.getElementById('fullName').focus();
        return false;
    }
    
    if (!data.phoneNumber) {
        alert('Vui lòng nhập số điện thoại!');
        document.getElementById('phoneNumber').focus();
        return false;
    }
    
    // Validate phone number format (Vietnamese)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(data.phoneNumber.replace(/[\s.-]/g, ''))) {
        alert('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam.');
        document.getElementById('phoneNumber').focus();
        return false;
    }
    
    if (!data.procedureDate) {
        alert('Vui lòng chọn ngày thực hiện thủ tục!');
        document.getElementById('procedureDate').focus();
        return false;
    }
    
    if (!data.procedureType) {
        alert('Vui lòng chọn thủ tục đăng ký thực hiện!');
        document.getElementById('procedureType').focus();
        return false;
    }
    
    return true;
}

/**
 * Get procedure display name
 */
function getProcedureName(value) {
    const procedures = {
        'dang_ky_xe': 'Đăng ký xe lần đầu trực tuyến',
        'doi_gplx': 'Đổi giấy phép lái xe trực tuyến',
        'cap_lai_gplx': 'Cấp lại giấy phép lái xe',
        'khac': 'Thủ tục khác'
    };
    return procedures[value] || value;
}

/**
 * Show success message
 */
function showSuccessMessage() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Đã đăng ký thành công!</h3>
            <p>Cảm ơn bạn đã gửi phản ánh. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
            <button class="btn btn-primary" onclick="closeSuccessMessage()">
                <i class="fas fa-times"></i> Đóng
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .success-modal {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            animation: slideUp 0.3s ease;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        
        .success-modal h3 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .success-modal p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    // Also show alert
    alert('Đã đăng ký thành công!');
}

/**
 * Close success message
 */
function closeSuccessMessage() {
    const overlay = document.querySelector('.success-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Make closeSuccessMessage globally accessible
window.closeSuccessMessage = closeSuccessMessage;

/**
 * Initialize smooth scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize animations on scroll
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translate(0) !important;
        }
    `;
    document.head.appendChild(style);
}
