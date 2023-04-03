import { useState } from 'react';

export const Avatar = ({avatarUrl, isActive}: {avatarUrl: string, isActive?: boolean}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return(
        <img className={`avatar ${imageLoaded ? '' : 'visually-hidden'} ${isActive ? 'active' : ''}`} src={avatarUrl} alt='avatar' onLoad={() => setImageLoaded(true)} />
    )
}