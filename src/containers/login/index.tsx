import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useAccountStore from "@/zustandStorage/accounts";

interface AccountProps {
  email: string;
  password: string;
  id: number;
}

export default function Login() {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {haveAccount ? (
          <SignIn setHaveAccount={setHaveAccount} />
        ) : (
          <SignUp setHaveAccount={setHaveAccount} />
        )}
      </Modal>
    </div>
  );
}
