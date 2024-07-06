import React, { useEffect } from 'react';
import './Translator.css';

const Translator = () => {

  useEffect(() => {

    const reOrder = () => {
      const mq = window.matchMedia("(min-width: 992px)");
      const rightChild = document.querySelector(".right-child");
      const h2 = rightChild.querySelector("h2");

      if (mq.matches) {
        rightChild.classList.add("customm");
        h2.textContent = "Scroll";
        const scroll = window.scrollY;
        const topContent = document.querySelector(".one").offsetTop - 25;
        const sectionHeight = document.querySelector(".left").offsetHeight;
        const rightHeight = rightChild.offsetHeight;
        const bottomContent = topContent + sectionHeight - rightHeight - 45;

        if (scroll > topContent && scroll < bottomContent) {
          rightChild.classList.remove("posAbs");
          rightChild.classList.add("posFix");
        } else if (scroll > bottomContent) {
          rightChild.classList.remove("posFix");
          rightChild.classList.add("posAbs");
        } else if (scroll < topContent) {
          rightChild.classList.remove("posFix");
        }
      } else {
        rightChild.classList.remove("customm", "posAbs", "posFix");
        h2.textContent = "fixed";
      }
    };

    window.addEventListener('scroll', reOrder);
    window.addEventListener('resize', reOrder);
    reOrder();

    return () => {
      window.removeEventListener('scroll', reOrder);
      window.removeEventListener('resize', reOrder);
    };
  }, []);

  return (
    <div className="container">
      <section className="one">

        <div className="right">
          <div className="right-child">
            <h2>Scroll</h2>
          </div>
        </div>
        
        <div className="left">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

      </section>
      <div className="bottom"></div>
    </div>
  );
};

export default Translator;
