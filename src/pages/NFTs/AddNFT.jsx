import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNFT, createURI, resetCrtStatus, resetURI } from '../../redux/NFT/Slice';
const AddNFT = () => {
  const { cropID } = useParams();
  const [image, setImage] = useState(null);
  const { NFTuri } = useSelector((state) => state.cropNFT);
  const { status } = useSelector((state) => state.cropNFT.crtNFT);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createURI({ cropID, image }));
  };

  const handleCreateNFT = async () => {
    dispatch(createNFT({ NFTuri, cropID }));
    dispatch(resetURI());
  };

  useEffect(() => {
    if (status === 'completed') navigate('/menu');
    dispatch(resetCrtStatus());
  }, [status, navigate]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded border-2 border-main-300 bg-main-300">
        <div className="w-full border-b border-primary-500 bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300">Enter your information</div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 px-3 py-2 pb-4 font-mono">
          <div className="">
            <label className="font-bold uppercase text-main-100">CROP ID</label>
            <p disabled className="w-full rounded bg-main-100 p-2 text-sm font-semibold text-main-400">
              {cropID}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 text-main-100">
            <h1>Please choose your image</h1>
            <img className="max-h-[250px] max-w-[250px] self-center rounded object-cover shadow-lg" src={image && URL.createObjectURL(image)} />
            <input type="file" onChange={handleImage} accept="image/*" required />
          </div>

          <button className="mt-2 w-fit self-end rounded-lg bg-main-400 px-4 py-1 font-bold text-main-100 hover:bg-main-100 hover:text-main-400" type="submit">
            Create URI
          </button>
          <div className="">
            <div className="relative">
              <label className="font-bold uppercase text-main-100">NFT URI</label>
              <div className="no-scrollbar w-full overflow-scroll rounded bg-main-100 p-2 text-sm font-semibold text-main-400">
                {NFTuri ? `https://black-flying-guanaco-398.mypinata.cloud/ipfs/${NFTuri}` : <p>Please create your image URI</p>}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="rounded border-2 border-main-300 bg-main-300">
        <div className="w-full border-b border-primary-500 bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300">CREATE NFT</div>
        <div className="px-3 py-2 ">
          <button
            onClick={handleCreateNFT}
            disabled={!NFTuri}
            className="group flex w-full items-center justify-between rounded-lg bg-main-100 px-4 py-3 font-bold uppercase text-primary-500 hover:bg-main-200 hover:text-main-100 disabled:bg-main-400"
          >
            CREATE NFT HERE
            <FontAwesomeIcon icon="fa-solid fa-plus" spin className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNFT;
