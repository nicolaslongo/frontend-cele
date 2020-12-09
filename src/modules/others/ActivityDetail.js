import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import axios from "axios";
import {
  ActivityDetailInformation,
  ActivityCreate,
} from "../../app/core/components";

const ScheduledActivity = ({ history }) => {
  const [information, setInformation] = useState({});
  const token = localStorage.getItem("greenconscious-token");
  const [user, setUser] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://0.0.0.0:5000/activity/${history.location.state}`)
      .then((response) => {
        setInformation(response.data);
        axios
          .get(`http://172.17.0.1:5000/my_activities`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            setUser(response.data.User);
            setIsAdmin(response.data.User.role === "admin");
            setEnableEdit(false);
          });
      });
  }, [history.location.state, token, user.admin]);

  return (
    <>
      <Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isAdmin &&
            (!enableEdit ? (
              <Button
                onClick={() => setEnableEdit(true)}
                shape="round"
                type="primary"
                icon={<EditTwoTone />}
                size={20}
              >
                {" "}
                Editar Actividad{" "}
              </Button>
            ) : (
              <Button
                onClick={() => setEnableEdit(false)}
                shape="round"
                type="primary"
                icon={<EditTwoTone />}
                size={20}
              >
                {" "}
                Cancelar Edición{" "}
              </Button>
            ))}
        </div>
      </Row>
      {!enableEdit ? (
        <ActivityDetailInformation information={information} />
      ) : (
        <ActivityCreate activity={information} user={user} history={history} />
      )}
    </>
  );
};

export default ScheduledActivity;
