import { TelegramShareButton, ViberShareButton, WhatsappShareButton } from "react-share";
import { TelegramIcon, ViberIcon, WhatsappIcon } from "react-share";

const SocialNetvork = ( {title} : {title: string} )  => {

  return (
    <div className="d-flex justify-content-around position-absolute bottom--10 start-50 translate-middle-x w-50">

      <WhatsappShareButton title={title} separator="::" url="#" className="mr-2">
              <WhatsappIcon size={50} borderRadius={15}/>
      </WhatsappShareButton>

      <TelegramShareButton title={title} url="#" className="mr-2">
              <TelegramIcon size={50} borderRadius={15}/>
      </TelegramShareButton>

      <ViberShareButton title={title} separator="::" url="#" className="mr-2">
              <ViberIcon size={50} borderRadius={15}/>
      </ViberShareButton>
    </div>
  )
}

export default SocialNetvork