
const NewImage = (props) => {
  return (
    <div style={{display:"flex", alignItems: "center", justifyContent:"space-between", width: "100%"}}>
        <div style={{display:"flex", alignItems:"center", gap: "4px"}}>
            <img style={{width: "35px"}} src={props.imageUrl} alt="" />
            <span>{props.imageName}</span>
        </div>
        <i className="fa-regular fa-xmark" onClick={props.deleteImage}></i>
    </div>
  )
}

export default NewImage;