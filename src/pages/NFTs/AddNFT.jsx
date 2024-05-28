import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNFT, createURL } from '../../redux/NFT/Slice';
const AddNFT = () => {
  const { cropID } = useParams();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, NFTurl } = useSelector((state) => state.cropNFT);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createURL({ cropID, image }));
  };

  const handleCreateNFT = async () => {
    dispatch(createNFT({ NFTurl, cropID }));
  };

  if (loading || error) return;

  return (
    <div className="gap-4 w-full flex flex-col">
      <div className="border-2 border-main-300 rounded bg-main-300">
        <div className="px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500">
          Enter your information
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-3 py-2 pb-4 w-full font-mono">
          <div className="">
            <label className="font-bold text-main-100 uppercase">CROP ID</label>
            <p
              disabled
              className="text-sm font-semibold
                        w-full rounded p-2 bg-main-100 text-main-400"
            >
              {cropID}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 text-main-100">
            <h1>Please choose your image</h1>
            <img
              className="max-w-[250px] max-h-[250px] object-cover self-center rounded shadow-lg"
              src={image && URL.createObjectURL(image)}
            />
            <input type="file" onChange={handleImage} accept="image/*" required />
          </div>

          <button
            className="hover:text-main-400 hover:bg-main-100
                    mt-2 self-end font-bold text-main-100 bg-main-400 rounded-lg w-fit px-4 py-1"
            type="submit"
          >
            Create URI
          </button>
          <div className="">
            <div className="relative">
              <label className="font-bold text-main-100 uppercase">NFT URI</label>
              <textarea
                value={`https://black-flying-guanaco-398.mypinata.cloud/ipfs/${NFTurl && NFTurl}`}
                className="focus:outline-none text-sm font-semibold
                            w-full rounded p-2 bg-main-100 text-main-400"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="border-2 border-main-300 rounded bg-main-300">
        <div className="px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500">
          CREATE NFT
        </div>
        <div className="px-3 py-2 ">
          <button
            onClick={handleCreateNFT}
            disabled={!NFTurl}
            className="w-full flex items-center justify-between uppercase bg-main-100
                        text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                        px-4 py-3 rounded-lg"
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
