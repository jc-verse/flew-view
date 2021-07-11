import {
  userCardInfo,
  totalTeamTypeList,
  cityList,
  serverQR,
} from "@/common/api";
import { setStorage, deepChange, closeLogin } from "@/common/utils";
import { mapState, mapMutations } from "vuex";
const isObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    ...mapMutations([
      "setUserInfo",
      "setTotalList",
      "setToken",
      "setCityList",
      "setQRData",
    ]),
    // 获取用户信息
    getUserInfo(options) {
      const avatarUrl = uni.getStorageSync("avatarUrl");
      userCardInfo({}, options || {})
        .then((res) => {
          const { data: nData } = res[1];
          const { data, code } = nData;
          if (code === 200) {
            data.wxCode = data.wxNum || "";
            data.name = data.userName || "";
            if (!data.avatar && avatarUrl) {
              data.avatar = avatarUrl;
            }
            setStorage({ userId: data.id });
            // getApp().globalData.userData = {...data} || {};
            this.userData = { ...data } || {};
            this.setUserInfo({ ...data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取全部学校列表
    totalTeamTypeList(options) {
      totalTeamTypeList({}, options || {})
        .then((res) => {
          const { data: nData } = res[1];
          const { data, code } = nData;
          if (code === 200) {
            this.setTotalList(deepChange(data || []));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeLogin() {
      closeLogin();
    },
    getCity() {
      cityList().then((res) => {
        if (Array.isArray(res)) {
          this.setCityList(res);
        }
      });
    },
    getServerQR() {
      serverQR().then((res) => {
        this.setQRData(res);
      });
    },
  },
};
