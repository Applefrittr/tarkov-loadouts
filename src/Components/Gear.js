import { useRef } from "react";
import "../Styles/Gear.css";

// Gear component renders out an image of item object as well as displays data info.  Props passed to Gear originate from the data object fetched in RoutePaths.js which
// then is filtered out by which ever parent component renders Gear
const Gear = (props) => {
  const ref = useRef();
  const purchaseInfo = [];

  // onClick function used to display object item data (name, description, vendor info) which overlays the item picture.  CSS used to make it appear to be a drop down,
  // scrollable container
  const show = () => {
    ref.current.classList.toggle("reveal");
  };

  // create markup for each vendor object and push into purchaseInfo array
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

  // Gear gets rendered inside a containing div element by which ever parent component calls Gear.  Img tag fills out the container div with the object item data rendered
  // inside the hidden overlay, which the user can display by clicking on the Gear component.
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
