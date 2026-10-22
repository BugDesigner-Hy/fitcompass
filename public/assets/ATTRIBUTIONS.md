# 素材署名

## 三维人体

肌肉模型来自 Z-Anatomy，骨骼模型来自 BodyParts3D。两者均经过网格简化和 glTF 转换，用于健身指北的交互浏览。

- Z-Anatomy / BodyParts3D 派生肌肉模型：CC BY-SA 4.0  
  https://github.com/Z-Anatomy/Models-of-human-anatomy
- BodyParts3D 骨骼模型：CC BY 4.0  
  https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- 转换后的模型文件来自  
  https://github.com/dev-christianmendes/anatomia_humana_3d

本项目对模型的使用包括重新着色、分组到训练肌肉与主要骨骼，并保留上述署名。

## 平面肌肉轮廓

平面视图使用 [Body Muscles](https://github.com/vulovix/body-muscles) 的 SVG 分区。

- Body Muscles：Apache-2.0  
  Copyright 2024 Ivan Vulović  
  https://github.com/vulovix/body-muscles

轮廓只作为可点击的肌肉分区，并映射到本项目的肌肉说明。

## 动作动图

动作循环图优先使用 [exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) 中的 GIF。页面会显示来源链接。面拉和胫骨前肌抬起在该数据集中没有对应动作，因此显示“暂无动作动图”。

这些 GIF 的上游媒体权利并不等同于仓库声明的 MIT 许可。当前按个人本地使用接入；公开再分发前需要替换为可再分发的媒体。原文件没有放进本仓库。

可以在应用内使用的静图来自 [RepDB](https://repdb.co) 免费档。署名必须保持可见：Exercise data by RepDB (repdb.co)。页面只保存对应图片的远程地址，不转载 650 条完整数据，也不使用 `premium-samples` 里的预览动画。

以下来源没有接入：

- ExerciseGymGifsDB：维护者说明 GIF 来自网络采集，不能据此再分发。
- exercise-library：外层 MIT 许可不覆盖其中的 GIF。
- Vital Animations 免费包：可以放在自己的应用里，但许可禁止把原始视频作为素材库再分发，因此没有提交到本仓库。
