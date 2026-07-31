/**
 * Evelyn Figueroa Ramirez - UGC Portfolio Accordion
 * Client-side JS controlling interactive accordion states, mobile tap behaviors, and keyboard navigation.
 */

// ==========================================================================
// 1. STATE CONFIGURATION & CACHE
// ==========================================================================
const DOM = {
  accordion: document.getElementById('accordion-group'),
  panels: document.querySelectorAll('.accordion-item')
};

// Tracks the currently active/expanded panel index (-1 means none)
let activeIndex = -1;

// ==========================================================================
// 2. ACCORDION CONTROLLER
// ==========================================================================
class AccordionController {
  /**
   * Expands a specific panel by index and collapses all others.
   * @param {number} targetIndex - The index of the panel to expand.
   */
  static expandPanel(targetIndex) {
    activeIndex = targetIndex;
    
    DOM.panels.forEach((panel, index) => {
      if (index === targetIndex) {
        panel.classList.add('is-expanded');
        panel.classList.remove('is-collapsed');
        panel.setAttribute('aria-expanded', 'true');
      } else {
        panel.classList.add('is-collapsed');
        panel.classList.remove('is-expanded');
        panel.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * Resets all panels to their default equal size (50/50 split).
   */
  static resetPanels() {
    activeIndex = -1;
    DOM.panels.forEach((panel) => {
      panel.classList.remove('is-expanded');
      panel.classList.remove('is-collapsed');
      panel.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Initializes all interaction event listeners.
   */
  static init() {
    if (!DOM.accordion || DOM.panels.length === 0) return;

    DOM.panels.forEach((panel, index) => {
      // 1. Desktop Hover Interaction
      panel.addEventListener('mouseenter', () => {
        AccordionController.expandPanel(index);
      });

      // 2. Mobile Tap / Click Interaction
      panel.addEventListener('click', (e) => {
        // If the tap occurs on the call-to-action button, let the link run.
        if (e.target.classList.contains('item-btn')) return;
        
        e.preventDefault();
        
        // Toggle behavior for mobile tap
        if (activeIndex === index) {
          AccordionController.resetPanels();
        } else {
          AccordionController.expandPanel(index);
        }
      });

      // 3. Accessibility: Keyboard Tab Navigation
      panel.addEventListener('focusin', () => {
        AccordionController.expandPanel(index);
      });
    });

    // Reset layout when mouse leaves the accordion container completely
    DOM.accordion.addEventListener('mouseleave', () => {
      AccordionController.resetPanels();
    });

    // Reset layout if focus leaves the accordion container entirely
    DOM.accordion.addEventListener('focusout', (e) => {
      // Small timeout to allow active element to change
      setTimeout(() => {
        if (!DOM.accordion.contains(document.activeElement)) {
          AccordionController.resetPanels();
        }
      }, 50);
    });
  }
}

// Initialize the controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AccordionController.init();
});
