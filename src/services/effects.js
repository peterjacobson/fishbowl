import * as FirestoreService from "./firestore";

export function anonAuthenticate({
  roomId,
  setError,
  setRoom,
  setRoomId,
  setUserId,
}) {
  FirestoreService.authenticateAnonymously()
    .then((userCredential) => {
      setUserId(userCredential.user.uid);
      if (roomId) {
        FirestoreService.getroom(roomId)
          .then((room) => {
            if (room.exists) {
              setError(null);
              setRoom(room.data());
            } else {
              setError("grocery-list-not-found");
              setRoomId();
            }
          })
          .catch(() => setError("grocery-list-get-fail"));
      }
    })
    .catch(() => setError("anonymous-auth-failed"));
}
