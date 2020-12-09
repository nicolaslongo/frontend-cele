import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import axios from "axios";
import { TalkDetailInformation, TalkCreate } from "../../app/core/components";

const ActivityDetail = ({ history, ...props }) => {
  const [information, setInformation] = useState({});
  const token = localStorage.getItem("greenconscious-token");
  const [user, setUser] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://0.0.0.0:5000/talk/${history.location.state}`)
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
        <Col align="top" justify="start">
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
        </Col>
      </Row>
      {!enableEdit ? (
        <TalkDetailInformation information={information} />
      ) : (
        <TalkCreate talk={information} user={user} history={history} />
      )}
    </>
  );
};

export default ActivityDetail;
