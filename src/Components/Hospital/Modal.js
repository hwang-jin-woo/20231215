import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgb(40, 40, 40, 0.5);
  z-index: 10001;
`;

export const ModalContent = styled.div`
  z-index: 10002;
  padding: 50px;
  background-color: white;
  position: relative;
  border-radius: 16px;
`;

export const ModalCloseBtn = styled.button`
  z-index: 10003;
  position: absolute;
  top: 20px;
  right: 20px;
`