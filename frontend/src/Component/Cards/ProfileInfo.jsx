import { useSelector } from "react-redux";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo }) => {
  const hasPhoto = userInfo?.profilePhotoUrl;
  return (
    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition">
      {hasPhoto ? (
        <img
          src={`http://localhost:8815${userInfo.profilePhotoUrl}`}
          alt={userInfo.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-red-900 text-white flex items-center justify-center font-semibold text-lg">
          {getInitials(userInfo.fullName)}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-gray-800">{userInfo.fullName}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;