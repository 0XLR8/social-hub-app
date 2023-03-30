import { ThreeDots } from "react-loader-spinner"

export const Loader = () => {
    return(
        <div className="loader">
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#965dff" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    )
}