import React, { useState, useContext } from 'react';

import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';
import Modal from '../../Shared/components/UIElements/Modal';
import Map from '../../Shared/components/UIElements/Map';
import './PlaceItem.css';
import { AuthContext } from '../../Shared/context/auth-context';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';


const PlaceItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);

    try {
      await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE');
      props.onDelete(props.id);
    } catch (err) {};
    
  };


  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

    return (
      <React.Fragment>
        <ErrorModal error={error} OnClear={clearError} />
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={props.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
          <div className="map-container">
            <Map center={props.coordinates} zoom={16} />
          </div>
        </Modal>
        <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          headerClass="place-item__info"
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </React.Fragment>
          }
        >
          <p className="place-item__info">
            Do you want to proceed and delete this place? Note that it can´t be
            undone thereafter.
          </p>
        </Modal>
        <li className="place-item">
          <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
              <img src={props.image} alt={props.title} />
            </div>
            <div className="place-item__info">
              <h1>{props.title}</h1>
              <h2>{props.address}</h2>
              <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === props.creatorId && (
                <Button to={`/places/${props.id}`}>EDIT</Button>
              )}
              {auth.isLouserIdggedIn === props.creatorId && (
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              )}
            </div>
          </Card>
        </li>
      </React.Fragment>
    );
};

export default PlaceItem;