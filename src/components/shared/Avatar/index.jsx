import React from "react";
import { Avatar, Link, Badge, Tooltip } from "@material-ui/core";
import styles from "./avatar.style";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import clsx from "clsx";
import PropTypes from "prop-types";

const dictionary = {
  // avatar size
  size: {
    small: 61,
    medium: 121,
    large: 184,
  },
  // Built-in badge
  badge: {
    setting: { icon: SettingsOutlinedIcon, tooltip: "הגדרות" },
    waiting: { icon: HourglassEmptyOutlinedIcon, tooltip: "ממתין" },
    manager: { icon: RecordVoiceOverOutlinedIcon, tooltip: "מנהל קבוצה" },
  },
};

export default function CustomAvatar({
  rootClassAvatar, // jss class
  badge, //setting, waiting, manager
  badgeComponnentIcon, // name of icon componnent
  badgeDescription, // tooltip for badge
  size, // small, medium, large or pixels
  image, // path of image
  borderColor, // border color of avatar
  fullName, // person's name
  uploadImage, // true, false
}) {
  const stylesProps = { borderColor, uploadImage };
  stylesProps.size = Object.keys(dictionary.size).includes(size)
    ? dictionary.size[size]
    : size;
  const classes = styles(stylesProps);
  let badgeContent,
    ComponentName = null,
    tooltip = null,
    altImage;
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
        classes={{ fontSizeLarge: classes.fontSizeDefaultIcon }}
      />
    </div>
  );

  return (
    <Badge
      color="primary"
      classes={{ badge: classes.rootBadge }}
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={badgeContent}
    >
      <Avatar
        alt={fullName}
        src={image}
        classes={{ root: clsx(rootClassAvatar, classes.root) }}
      >
        {altImage}
      </Avatar>
    </Badge>
  );
}

CustomAvatar.propTypes = {
  /**
   * jss class
   */
  rootClassAvatar: PropTypes.node,
  /**
   * build-in badge: setting, waiting, manager
   */
  badge: PropTypes.string,
  /**
   * icon (if not used in build-in badge)
   */
  badgeComponnentIcon: PropTypes.elementType,
  /**
   * tooltip for badge (if not used in build-in badge)
   */
  badgeDescription: PropTypes.string,
  /**
   * size of avatar: small, medium, large. default: large or pixels
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large"]),
    PropTypes.number
  ]),

  /**
   * path of image or image
   */
  image: PropTypes.node,
  /**
   * border color of avatar
   */
  borderColor: PropTypes.string,
  /**
   * person's name for alt image of avatar
   */
  fullName: PropTypes.string,
  /**
   * Indicate if display uploadImage. default: false
   */
  uploadImage: PropTypes.bool,
};

CustomAvatar.defaultProps = {
  borderColor: "#faddcf",
  size: "large",
};
