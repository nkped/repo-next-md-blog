import Image from "next/image"

type Props = {
    src: string,
    alt: string,
    priority?: string
}

export default function CustomImage({ src, alt, priority }: Props) {

    const prty = priority ? true : false

    return (
        <div className="w-full h-full">
            <Image 
                src={src} 
                alt={alt} 
                width={650} 
                height={650} 
                priority={prty}
                />
        </div>

    )

}


/* NB!!
- priority is set to true when image should load 'above the fold', meaning instantly
- width={650} and height={650} are merely suggestive to nextjs and to be regarded mostly as max-values
- sharp-dependency is for images
 */