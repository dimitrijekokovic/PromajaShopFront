import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
`;

export default function Popup({ show, onClose, children }) {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        {children}
      </PopupContent>
    </Overlay>
  );
}