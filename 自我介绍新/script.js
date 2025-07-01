document.addEventListener("DOMContentLoaded", function () {

    // 初始化粒子背景
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#4F46E5" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#4F46E5",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // 动画加载
    const fadeElements = document.querySelectorAll('.animate-fade-in-up');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(element => fadeInObserver.observe(element));

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2', 'shadow-md');
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 深色模式切换
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            updateParticleColor("#4F46E5");
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            updateParticleColor("#EC4899");
        }
    });

    function updateParticleColor(color) {
        particlesJS('particles-js', {
            "particles": {
                "color": { "value": color },
                "line_linked": { "color": color }
            }
        });
    }

    // 轮播图功能
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const dotsContainer = document.querySelector('.slider-dots');
const slides = document.querySelectorAll('.slider-item');
let currentIndex = 0;
let slideInterval;

// 创建轮播点
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) {
        dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
    dotsContainer.appendChild(dot);
});

// 更新轮播图
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 自动轮播
function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);
}

// 停止自动轮播
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// 上一页
prevButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    startAutoSlide();
});

// 下一页
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    startAutoSlide();
});

startAutoSlide();

// 技能雷达图
const ctx = document.getElementById('skillsRadarChart').getContext('2d');
const skillsRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['前端开发', 'UI/UX设计', '后端开发', '沟通能力', '团队协作'],
        datasets: [{
            label: '技能水平',
            data: [90, 85, 75, 80, 85],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    }
});

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const chatbotOpen = document.getElementById('chatbot-open');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotMessages = document.getElementById('chatbot-messages');

    let isProcessing = false;

    // 显示聊天框并自动聚焦
    chatbotOpen.addEventListener('click', () => {
        chatbotContainer.classList.remove('hidden');
        chatbotOpen.classList.add('hidden');
        setTimeout(() => chatbotInput.focus(), 100);
    });

    // 隐藏聊天框
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.add('hidden');
        chatbotOpen.classList.remove('hidden');
    });

    // 发送消息
    if (chatbotForm && chatbotInput) {
        chatbotForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (isProcessing) return;

            const userMessage = chatbotInput.value.trim();
            if (!userMessage) return;

            isProcessing = true;

            addMessage(userMessage, 'user');
            chatbotInput.value = '';
            chatbotInput.focus();

            addMessage("正在思考中...", 'bot');

            try {
                const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'sk-7561e9dc86524c189ab68aca4e3f93e8',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'qwen-max',
                        input: { prompt: userMessage }
                    })
                });

                if (!response.ok) {
                    throw new Error(`服务器返回错误: ${response.statusText}`);
                }

                const data = await response.json();
                const botReply = data.output?.text || '抱歉，我没有理解您的问题。';

                removeThinkingMessage();
                addMessage(botReply, 'bot');
            } catch (error) {
                console.error('API 请求失败:', error);
                removeThinkingMessage();
                addMessage('网络错误或服务不可用，请稍后再试。', 'bot');
            } finally {
                isProcessing = false;
            }
        });
    } else {
        console.error("找不到聊天表单或输入框，请检查 HTML 结构");
    }

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`;
        messageDiv.innerHTML = `
            <div class="${sender === 'user' ? 'bg-primary text-white ml-auto' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'} px-4 py-2 rounded-lg inline-block max-w-xs md:max-w-md lg:max-w-lg thinking">
                ${message}
            </div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeThinkingMessage() {
        const loadingMsg = document.querySelector('.thinking');
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }
});