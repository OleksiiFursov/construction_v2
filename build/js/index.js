// sticky header
const pageTop = document.querySelector(".page-top");

function headerObserver() {
    const options = {
        rootMargin: "0px",
        threshold: 1.0,
    };

    let observer = new IntersectionObserver(([e]) => {
        const action = e.intersectionRatio === 0 ? 'add' : 'remove';
        document.documentElement.classList[action]('is-scroll');
    }, options);

    observer.observe(pageTop);
}

headerObserver()

//responsive menu
const headerNav = document.querySelector(".header-menu");
const menuLinks = document.querySelectorAll(".menu-link");
const burgerMenu = document.querySelector(".burger-menu");
const logo = document.querySelector(".logo-container");


burgerMenu.addEventListener("click", () => {
    headerNav.classList.toggle("active");
    burgerMenu.classList.toggle('active');
    logo.classList.toggle('active');
});

menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetSelector = link.dataset.goto;
        const targetSection = document.querySelector(targetSelector);

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        headerNav.classList.remove("_active");
    });
});

// date difference
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().valueOf();

    document.querySelectorAll(".years-num").forEach(span => {
        const dateParse = (span.dataset.date || '').split('-');
        dateParse[1]--;
        const date = new Date(...dateParse);
        span.textContent = ((today - date) / 31536000000) >> 0;
    });
});

//animated number


const easingFunction = t => t * t * (3 - 2 * t) * 2;

const configAnimatedNumber = {
    rate: 60,
    selector: '.fx-animate-number',
    duration: 2500,
    round: 0
}

function animatedNumber() {
    const {rate, selector, duration, round} = configAnimatedNumber;

    const countLoop = rate * (duration / 1000);
    const interval = 1000 / rate;


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (!entry.isIntersecting || el.classList.contains('fx-animated-finished')) return;

            const maxValue = +el.textContent;
            const suffix = el.dataset.suffix;
            const display = (value) => {
                el.textContent = value.toFixed(round) + suffix
            }

            if (isNaN(maxValue)) {
                console.error('Element .fx-animated-number not contains number. Please check: ' + el.textContent)
                display(maxValue);
                return;
            }
            const step = maxValue / countLoop;
            let i = 0;
            let current = 0;


            const timer = setInterval(() => {
                if (countLoop === ++i) {
                    clearInterval(timer);
                    el.classList.add('fx-animated-finished')
                    display(maxValue);
                    return;
                }
                current += step * easingFunction(i / countLoop);
                display(current);
            }, interval);

        })
    });

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    })

}

animatedNumber();

// current year 
const yearSpan = document.querySelector('.current-year');
document.addEventListener("DOMContentLoaded", function () {
    yearSpan.innerHTML = new Date().getFullYear();

});


function getIndexElement(el) {
    let index = -1;
    while (el) {
        el = el.previousElementSibling
        index++;
    }
    return index;

}

document.addEventListener('click', e => {
    const el = e.target;

    const tabsNav = el.closest('.tabs-nav>ul');
    if (!tabsNav) return;
    const tabsRoot = tabsNav.closest('.fx-tabs');
    const tabsContents = tabsRoot.querySelector('.tab-contents');


    // removed old active
    const activeNavElement = tabsRoot.querySelector('.tabs-nav li.active');
    if(activeNavElement){
        activeNavElement.classList.remove('active');
    }

    const index = getIndexElement(el);
    tabsContents.children[0].style.marginLeft = -(index*100)+'%';
    tabsNav.children[index].classList.add('active');





});