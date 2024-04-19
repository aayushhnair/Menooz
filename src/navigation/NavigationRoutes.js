// Tab Route
import Home from '../containers/Home/Home';
import Profile from '../containers/Profile/Profile';
import Save from '../containers/Save/Save';
import Menu from '../containers/Menu/Menu';
import Cart from '../containers/Cart/Cart';

// Screens Route
import Login from '../containers/auth/Login';
import Splash from '../containers/auth/Splash';
import OnBoarding from '../containers/auth/OnBoarding';
import OnBoarding2 from '../containers/auth/OnBoarding2';
import Connect from '../containers/auth/Connect';
import TabBar from './Type/TabBarNavigation';
import SignUp from '../containers/auth/SignUp';
import OtpVerification from '../containers/auth/OtpVerification';
import ForgotPassword from '../containers/forgotpassword/ForgotPassword';
import NewPassword from '../containers/forgotpassword/NewPassword';
import ProductList from '../containers/Menu/ProductList';
import ProductDetail from '../containers/Home/ProductDetail';
import CreateMyPack from '../containers/Menu/CreateMyPack';
import CreateBundleDetails from '../containers/Menu/CreateBundleDetails';
import CheckOut from '../containers/Checkout/CheckOut';
import OrderPage from '../containers/Checkout/OrderPage';
import Search from '../containers/Home/Search';
import MyOrder from '../containers/Profile/Order/MyOrder';
import OrderDetails from '../containers/Profile/Order/OrderDetails';
import OfferAndPromos from '../containers/Profile/Voucher/OfferAndPromos';
import CouponDetails from '../containers/Profile/Voucher/CouponDetails';
import DeliveryAddress from '../containers/Profile/Address/DeliveryAddress';
import NewAddress from '../containers/Profile/Address/NewAddress';
import EditProfile from '../containers/Profile/EditProfile';
import ChangePassword from '../containers/Profile/ChangePassword';
import ChangePhoneNumber from '../containers/Profile/ChangePhoneNumber';
import Notification from '../containers/Profile/Notification';
import SelectLanguage from '../containers/Profile/SelectLanguage';
import Setting from '../containers/Profile/Setting';
import Payment from '../containers/Profile/Payment';
import AddNewCard from '../containers/Profile/AddNewCard';
import AboutUs from '../containers/Profile/AboutUs';
import ContactUs from '../containers/Profile/ContactUs';
import Faq from '../containers/Profile/Faq';
import Help from '../containers/Profile/Help';
import TermAndConditions from '../containers/Profile/TermAndConditions';
import Review from '../containers/Home/Review';

export const StackRoute = {
  Splash,
  OnBoarding,
  OnBoarding2,
  Login,
  Connect,
  TabBar,
  SignUp,
  OtpVerification,
  ForgotPassword,
  NewPassword,
  ProductList,
  ProductDetail,
  CreateMyPack,
  CreateBundleDetails,
  Cart,
  CheckOut,
  OrderPage,
  Search,
  MyOrder,
  OrderDetails,
  OfferAndPromos,
  CouponDetails,
  DeliveryAddress,
  NewAddress,
  EditProfile,
  ChangePassword,
  ChangePhoneNumber,
  Notification,
  SelectLanguage,
  Setting,
  Payment,
  AddNewCard,
  AboutUs,
  ContactUs,
  Faq,
  Help,
  TermAndConditions,
  Review,
};

export const TabRoute = {
  Home,
  Profile,
  Menu,
  Save,
};
