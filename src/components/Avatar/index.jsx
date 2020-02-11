import React from "react";
import { Avatar, Link, Badge, Tooltip } from "@material-ui/core";
import styles from "./avatar.style";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import clsx from "clsx";
//import Button from "@material-ui/core/ButtonBase";

const dictionary = {
  size: {
    small: 0.33,
    medium: 0.66,
    large: 1
  },
  badge: {
    setting: { icon: SettingsOutlinedIcon, tooltip: "הגדרות" },
    waiting: { icon: HourglassEmptyOutlinedIcon, tooltip: "ממתין" },
    manager: { icon: RecordVoiceOverOutlinedIcon, tooltip: "מנהל קבוצה" }
  }
};

export default ({
  rootClassAvatar, // jss class
  badge, //setting, waiting, manager
  badgeComponnentIcon, // name of icon componnent
  badgeDescription, // tooltip for badge
  size, // small, medium, large
  image, // path of image
  borderColor = "#faddcf", // border color of avatar
  fullName, // person's name
  uploadImage // true, false
}) => {
  const stylesProps = { borderColor };
  stylesProps.size = Object.keys(dictionary.size).includes(size)
    ? dictionary.size[size]
    : dictionary.size["large"];
  const classes = styles(stylesProps);
  let badgeContent,
    ComponentName = null,
    tooltip = null,
    altImage,
    avatarClassColor = classes.bgColorRoot;
  if (badgeComponnentIcon) {
    ComponentName = badgeComponnentIcon;
    tooltip = badgeDescription;
  } else if (Object.keys(dictionary.badge).includes(badge)) {
    ComponentName = dictionary.badge[badge].icon;
    tooltip = dictionary.badge[badge].tooltip;
  }

  badgeContent = ComponentName ? (
    <Tooltip title={tooltip} placement="top-end">
      <ComponentName
        color="primary"
        classes={{ colorPrimary: classes.iconColorPrimary }}
      />
    </Tooltip>
  ) : null;

  altImage = uploadImage ? (
    <div className={classes.altImage}>
      <AddAPhotoOutlinedIcon className={classes.addPhotoIcon} />
      <span className={classes.uploadImageText}>העלה תמונה</span>
      <Link underline="always" color="inherit" className={classes.linkGetPhoto}>
        שנה דמות
      </Link>
    </div>
  ) : (
    <div>
      <PersonOutlineOutlinedIcon
        color="disabled"
        fontSize="large"
        classes={{ fontSizeLarge: classes.fontSizeLargeIcon }}
      />
    </div>
  );

  if (!uploadImage) avatarClassColor = classes.bgColorDefaultAvater;

  return (
    <Badge
      color="primary"
      classes={{ badge: classes.rootBadge }}
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      badgeContent={badgeContent}
    >
      <Avatar
        alt={fullName}
        src={image}
        classes={{ root: clsx(rootClassAvatar, avatarClassColor, classes.root) }}
      >
        {altImage}
      </Avatar>
    </Badge>
  );
};
