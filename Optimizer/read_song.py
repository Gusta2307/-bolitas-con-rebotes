
import librosa

x, sr = librosa.load('../Audios Fernan/regueton-ciclico-medio-malito.ogg')       

onset_frames = librosa.onset.onset_detect(x, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)
onset_times = list(librosa.frames_to_time(onset_frames))

print(onset_times)


{
    "prob_sol":1,
    "times":
        [0.5340589569160997,0.9984580498866213,1.4164172335600906,1.7182766439909296,2.182675736961451,2.6238548752834467,2.9257142857142857,3.3901133786848074,3.8545124716553287,4.31891156462585,4.574331065759637,4.992290249433107,5.317369614512471,5.804988662131519,6.2693877551020405,6.68734693877551,6.9892063492063485,7.45360544217687,7.8947845804988654,8.196643990929704,8.661043083900227,9.125442176870749,9.58984126984127,9.845260770975056,10.263219954648527,10.588299319727891],
        "balls":3,
        "loop":true,
        "distribution_balls":[
            [
                [5.467519199250946,1,1,0,1.4876981497330193,0],
                [5.467519199250946,1,1,0,2.3932763810255366,0],
                [6.704793509700178,1,2,0,4.403955517137898,0]
            ],
            [
                [6.451782433862433,1,2,0,0.8189811954009462,0],
                [5.467519199250946,1,1,0,3.159534884426897,0],
                [5.467519199250946,1,1,0,4.0883330703679395,0],
                [5.467519199250946,1,1,0,5.086791120254561,0]
            ],
            [
                [5.467519199250946,1,1,0,1.1858387393021803,0],
                [5.467519199250946,1,1,0,2.6951357914563756,0],
                [6.1987713580246915,1,2,0,3.664686932481838,0]
            ]
        ]
    }