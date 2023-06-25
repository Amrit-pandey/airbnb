import Image from "./image";

const PlaceImage = ({place,index=0,className=null}) => {

    if(!place.photos?.length > 0){
        return ''
    }

    if(!className) {
        className = 'object-cover'
    }
    return(
            <Image className={className} src={place.photos[index]} />
    )
}

export default PlaceImage;