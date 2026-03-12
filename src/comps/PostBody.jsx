import React from 'react';
import { CardBody } from '@heroui/react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';



export default function PostBody({ body, image }) {
  return (
    <CardBody className="w-full h-auto max-h-64 overflow-hidden flex flex-col">
      <p className="text-xl  font-bold text-white mb-3 shrink-0">
        {body}
      </p>
      
      {image && (
        <div className="zoom-wrapper w-full relative flex-1 min-h-0">
          <Zoom 
            zoomImg={{ className: "w-full h-full object-contain" }} 
          >
            <img
              alt="Card background"
              className="rounded-xl w-full h-full object-cover" 
              src={image}
            />
          </Zoom>
        </div>
      )}
    </CardBody>
  );
}