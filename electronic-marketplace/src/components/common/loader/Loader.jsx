import { ThreeDots} from "react-loader-spinner";
import { useSelector } from "react-redux";
import "./loader.css";


const Loader = () => {
  const { apiRequestIsLoading: pageIsLoading } = useSelector(
    (store) => store.appSettings
  );

  return (
    <>
      {pageIsLoading && (
        <div className="eclipse">
          <div className="progress">
            <div>
              <ThreeDots height={100} width={100} color="#0025af" />
            </div>
          </div>
        </div>
      )} 
    </>
  );
};
export default Loader;
