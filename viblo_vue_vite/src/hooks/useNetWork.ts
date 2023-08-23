import { nextTick, readonly, ref, watch } from 'vue';

export default function useNetwork(timeDuration = 2000) {
  const navigator = window.navigator;
  const isOnline = ref(navigator.onLine);
  const isShow = ref(false);

  //Tiến hành xe
  window.addEventListener('online', () => {
    isOnline.value = true;
  });

  window.addEventListener('offline', () => {
    isOnline.value = false;
  });

  const hideToast = (time = 2000) => {
    setTimeout(() => {
      isShow.value = false;
    }, time);
  };

  // Khi chúng ta bắt được sự kiện thay đổi mạng (isOnline) ở phía trên chúng ta sẽ tiến hành hiện popup và tắt popup theo thời gian mong muốn với timeDuration

  watch(isOnline, () => {
    //Chỗ này mình mong muốn là sẽ phải tắt thuộc tính show trước khi mở lại toast tránh trường hợp người dùng đang được mở popup sẽ ko có animation

    isShow.value = false;
    nextTick(() => {
      isShow.value = true;
      hideToast(timeDuration);
    });
  });

  // Ở đây mình sử dụng readonly để tránh trường hợp edit được 2 trạng thái này bên ngoài , chỗ này các bạn có thể bỏ không nếu muốn
  return { isOnline: readonly(isOnline), isShow: readonly(isShow) };
}
