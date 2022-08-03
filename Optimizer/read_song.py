
import librosa

x, sr = librosa.load('../Audios Fernan/samba.mp3')       

onset_frames = librosa.onset.onset_detect(x, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)
onset_times = librosa.frames_to_time(onset_frames)

print(onset_times)
