import React, { useState } from "react";
import { Box, Modal } from "@/components/atoms";

export const AdminUserPage: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <Box dir="row" padTop={20} padBottom={30} gap={20}>
      <button onClick={() => setShow(true)}>show modal</button>
      <Modal title="제목입니다" show={show} setShow={setShow}>
        모달 예시입니다
      </Modal>
    </Box>
  );
};
