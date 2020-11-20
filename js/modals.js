export default class Modals {
    static isVisible = "is-visible";

    static initModals() {
        //This supports multiple modals
        const openEls = document.querySelectorAll("[data-open]");
        const closeEls = document.querySelectorAll("[data-close]");
        const self = this;
        for (const el of openEls) {
            el.addEventListener("click", function () {
                const modalId = this.dataset.open;                
                document.getElementById(modalId).classList.add(Modals.isVisible);
            });
        }
    
        for (const el of closeEls) {
            el.addEventListener("click", function () {
                const modal = this.closest('.modal');
                modal.classList.remove(Modals.isVisible);
            });
        }
    
        document.addEventListener("click", e => {
            if (e.target == document.querySelector(".modal.is-visible")) {
                Modals.hideModals()
            }
        });
    
        document.addEventListener("keyup", e => {
            // if we press the ESC
            if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
                Modals.hideModals()    
            }
        });
    }
    
    // You can close modals setting data-close or calling this method
    static hideModals() {        
        document.querySelector(".modal.is-visible").classList.remove(Modals.isVisible);
    }
}