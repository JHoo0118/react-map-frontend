import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import Context from "./context";
import Blog from "./Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_PINS_QUERY, DELETE_PIN } from "./Pin/PinQueries";
import TimeAgo from "./TimeAgo";
import FullPhoto from "./FullPhoto";

const INITIAL_VIEWPORT = {
  latitude: 37.550497,
  longitude: 127.073847,
  zoom: 13
};

const NavigationControlBox = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  margin: 1em;
`;

const UserOriginLocationPinContiner = styled.div`
  color: ${props => props.theme.DeepRedColor};
`;

const UserSelectLocationPinContiner = styled.div`
  color: ${props => props.theme.purpleColor};
`;

const UserCreatePinContainer = styled.div`
  color: ${props => props.theme.blueColor};
`;

const UserCreatePinContainerNewest = styled.div`
  color: limegreen;
`;

const ToggleButtonBox = styled.div`
  position: absolute;
  top: 14px;
  left: ${props => props.left};
  transform: ${props => props.translateVal};
  transition: all 0.4s ease-in-out;
  z-index: 30;
`;

const ToggleButton = styled.button`
  width: 23px;
  height: 48px;
  border: 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9)
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAQAAAAXDMSnAAAAi0lEQVR4AX3JQcqBURQG4O/+9WNG30D3vOfSDTuQsgcZyBakZANSzMVMBme3zsBI5/VMn4ZKLP5ki1E4tYejWpilxVUtzOEUD68odYmXR5BJNp/4zllXD2phllYvamHmirsayUkfJ5ruHzueTldC08kcT5YOY9xYujqQM03XKXuaLmEtNF1e1Nz89gbL+0do6OEwRwAAAABJRU5ErkJggg==)
    7px center/7px 10px no-repeat;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  transform: ${props => props.scaleX};
  display: inline-block;
  &:focus {
    outline: none;
    border: 0;
  }
  &:active,
  &:active:focus {
    border: 0;
  }
`;

const PopupImage = styled.img`
  padding: 0.4em;
  width: 200px;
  height: 100px;
  object-fit: "cover";
`;

const PopupTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
`;

const PopupWrapper = styled.div`
  width: 100%;
`;

const PopupText = styled.span`
  display: block;
  text-align: center;
`;

const DeleteIconContainer = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.redColor};
`;

export default ({ data }) => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  const { data: getPins, loading } = useQuery(GET_PINS_QUERY);
  const [deletePinMutation] = useMutation(DELETE_PIN, {
    refetchQueries: () => [{ query: GET_PINS_QUERY }]
  });

  const [popup, setPopup] = useState(null);
  const isSelf = () => {
    return data.me.id === popup.author.id;
  };

  let getPinsVal = "";
  if (!loading) {
    getPinsVal = getPins.getPins;
  }

  const getPinsFunc = useCallback(() => {
    if (!loading) {
      dispatch({ type: "GET_PINS", payload: getPinsVal });
    }
  }, [loading, dispatch, getPinsVal]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && !loading) {
      getPinsFunc();
    }
    return () => (isSubscribed = false);
  }, [getPinsFunc, loading]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getUserPosition();
    }
    return () => (isSubscribed = false);
  });

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleToggleButton = () => {
    dispatch({ type: "HANDLE_TOGGLE_BUTTON" });
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude }
    });
    dispatch({ type: "ALWAYS_TRUE" });
  };

  const highlightNewPin = pin => {
    const isNewPin = TimeAgo(pin) <= 30;
    return isNewPin;
  };

  const handleSelectPin = pin => {
    setPopup(pin);
    dispatch({ type: "SET_PIN", payload: pin });
    dispatch({ type: "ALWAYS_TRUE" });
  };

  const handleDeletePin = async pin => {
    const {
      data: { deletePin }
    } = await deletePinMutation({
      variables: {
        id: pin.id
      }
    });
    await dispatch({ type: "DELETE_PIN", payload: deletePin });
    dispatch({ type: "ALWAYS_FALSE" });
    setPopup(null);
  };

  return (
    <>
      <>
        {state.seeFullPhoto && <FullPhoto />}
        {!state.isOpened ? (
          <ToggleButtonBox translateVal="translate(-400px)" left="400px">
            <ToggleButton onClick={handleToggleButton} scaleX="scaleX(-1)" />
          </ToggleButtonBox>
        ) : (
          <ToggleButtonBox translateVal="translate(0)" left="400px">
            <ToggleButton onClick={handleToggleButton} />
          </ToggleButtonBox>
        )}
        {state.isOpened ? (
          <Blog data={data} translateVal="translate(0)" />
        ) : (
          <Blog />
        )}
      </>
      {!loading && (
        <ReactMapGL
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/outdoors-v10"
          mapboxApiAccessToken="pk.eyJ1Ijoia2lrMzA3OCIsImEiOiJjanpuaTdoYWYwNGkxM25xNXJzNWNhY2RzIn0.5SxiVoSEQzaxdkAvNUBG5g"
          onViewportChange={newViewport => setViewport(newViewport)}
          onClick={handleMapClick}
          {...viewport}
        >
          <NavigationControlBox>
            <NavigationControl
              onViewportChange={newViewport => setViewport(newViewport)}
            />
          </NavigationControlBox>
          {userPosition && (
            <Marker
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <UserOriginLocationPinContiner>
                <FontAwesomeIcon icon={faMapPin} size="2x" />
              </UserOriginLocationPinContiner>
            </Marker>
          )}
          {state.draft && state.isOpened && (
            <Marker
              latitude={state.draft.latitude}
              longitude={state.draft.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <UserSelectLocationPinContiner>
                <FontAwesomeIcon icon={faMapPin} size="2x" />
              </UserSelectLocationPinContiner>
            </Marker>
          )}
          {state.pins.map((pin, index) => (
            <Marker
              key={index}
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              {highlightNewPin(pin) ? (
                <UserCreatePinContainerNewest
                  onClick={() => handleSelectPin(pin)}
                >
                  <FontAwesomeIcon icon={faMapPin} size="2x" />
                </UserCreatePinContainerNewest>
              ) : (
                <UserCreatePinContainer onClick={() => handleSelectPin(pin)}>
                  <FontAwesomeIcon icon={faMapPin} size="2x" />
                </UserCreatePinContainer>
              )}
            </Marker>
          ))}
          {popup && (
            <Popup
              anchor="top"
              latitude={popup.latitude}
              longitude={popup.longitude}
              closeOnClick={false}
              onClose={() => setPopup(null)}
            >
              <PopupImage src={popup.image} alt={popup.title} />
              <PopupTab>
                <PopupWrapper>
                  <PopupText>
                    {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
                  </PopupText>
                </PopupWrapper>
                {isSelf() && (
                  <DeleteIconContainer onClick={() => handleDeletePin(popup)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                  </DeleteIconContainer>
                )}
              </PopupTab>
            </Popup>
          )}
        </ReactMapGL>
      )}
    </>
  );
};
