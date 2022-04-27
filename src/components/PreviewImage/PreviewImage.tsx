import { useState } from "react";

export default function PreviewImage({ file }: any) {
    const [preview, setPreview] = useState(null);


    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result as any);
    };

    
  return (
    <div>
        <img src={preview as any} alt="preview" width='200px' height='200px' />
    </div>
  )
}