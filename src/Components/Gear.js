import { useRef } from "react";
import "../Styles/Gear.css";

const Gear = (props) => {
  const ref = useRef();
  const purchaseInfo = [];

  const show = () => {
    console.log(props.vendor);
    ref.current.classList.toggle("reveal");
  };

  props.vendor.forEach((vendor) => {
    purchaseInfo.push(
      <div key={vendor.vendor.name}>
        <div>
          <i>Vendor:</i> {vendor.vendor.name}
        </div>
        <div>
          <i>Price:</i> {vendor.price} {vendor.currency}
        </div>
      </div>
    );
  });

  return (
    <section onClick={show} className="gear-container">
      <img src={props.img} alt={props.item.name} className="gear-image"></img>
      <div className="gear-info-container" ref={ref}>
        <div className="gear-name">
          <b>
            <i>{props.item.name}</i>
          </b>
        </div>
        <div>{props.item.description}</div>
        <div className="purchase-info">
          <p>
            <i>
              <b>Purchase Options</b>
            </i>
          </p>
          {purchaseInfo}
        </div>
      </div>
      <div className="shortname-tag">
        <i>
          <b>{props.item.shortName}</b>
        </i>
      </div>
    </section>
  );
};

export default Gear;
