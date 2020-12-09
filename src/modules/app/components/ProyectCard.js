import React from 'react';
import { Descriptions } from 'antd';

import './ProyectCard.css';

const ProyectCard = ({proyect, ...props}) => {
  const thisTitle = "Expediente " + proyect.expediente;

  return (
    <div>
      <Descriptions
        title={thisTitle}
        bordered
        className='my-descriptions-label'
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <Descriptions.Item label="Expediente diputados">{proyect.expediente_diputados}</Descriptions.Item>
        <Descriptions.Item label="Expediente senado">{proyect.expediente_senado}</Descriptions.Item>
        <Descriptions.Item label="Fecha">{proyect.fecha}</Descriptions.Item>
        <Descriptions.Item label="Iniciado en">{proyect.iniciado_en}</Descriptions.Item>
        <Descriptions.Item label="Estado parlamentario">{proyect.estado_parlamentario_detalle}</Descriptions.Item>
        {
          proyect.link != null &&
            <Descriptions.Item label="Texto del proyecto"> <a href={proyect.link}>Texto disponible</a> </Descriptions.Item>
	      }
          <Descriptions.Item label="Extracto">{proyect.extracto}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProyectCard;