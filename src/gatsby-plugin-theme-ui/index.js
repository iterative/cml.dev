import { system as preset } from '@theme-ui/presets'
import { alpha } from '@theme-ui/color'

const palette = {
  ...preset.colors,
  cyan: ['#24ADC5', '#B6E8ED'],
  purple: ['#9361D3', '#BB8DDA', '#7845BA'],
  darkPurple: ['#3A2D4C', '#4A3F63'],
  gray: '#EEF4F8',
  white: '#FFF',
  navy: ['#2C274B', '#737396', '#9898B0'],
  orange: ['#F26740', '#F6936A'],
  yellow: '#E3EE9E'
}

export default {
  ...preset,
  breakpoints: ['480px', '640px', '980px', '1440px'],
  fonts: {
    body: '"DM Sans", sans-serif',
    heading: '"DM Sans", sans-serif',
    monospace: '"DM Mono", monospace'
  },
  text: {
    ...preset.text,
    accuracy: {
      px: '20px',
      py: '10px'
    }
  },
  colors: {
    ...palette,
    background: palette.white,
    text: palette.darkPurple[0],
    primary: palette.purple[0],
    modes: {
      dark: {
        ...palette,
        background: palette.white,
        text: palette.darkPurple[0],
        primary: palette.purple[0]
      }
    }
  },
  tooltips: {
    primary: {
      '&[title]': {
        position: 'relative',
        '&:after': {
          textAlign: 'center',
          content: 'attr(title)',
          position: 'absolute',
          bottom: '100%'
        }
      }
    }
  },
  shadows: {
    wide: '0px 20px 30px rgba(74, 63, 99, 0.1)'
  },
  radii: [0, '8px'],
  sizes: {
    container: '1280px',
    ...[0, '4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px']
  },
  layout: {
    ...preset.layout,
    container: {
      maxWidth: '1280px',
      mx: 'auto',
      px: 3
    },
    GradientText: {
      fontWeight: '800',
      background: 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)',
      backgroundSize: '100%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      MozBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      MozTextFillColor: 'transparent'
    },
    SiteLogo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: [75, null, 98, 113],
      height: [28, null, 36, 40],
      span: {
        display: 'block',
        mr: 'auto',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: [28, null, 36, 40],
        height: [28, null, 36, 40]
      },
      svg: {
        width: [41, null, 52, 58],
        height: [14, null, 18, 26]
      }
    },
    Header: {
      color: 'background',
      backgroundColor: 'text',
      Inner: {
        variant: 'layout.container',
        mx: 'auto',
        maxWidth: '1280px',
        py: ['12px', null, '20px', '36px'],
        pb: ['6px', null, '20px', '36px'],
        px: ['16px', null, '24px', '80px'],
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexFlow: ['column', null, 'row']
      },
      Nav: {
        px: 0,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: ['wrap', null, 'nowrap'],
        justifyContent: ['center', null, 'flex-end'],
        flex: '1',
        alignItems: ['center'],
        LinksWrapper: {
          width: ['100%', null, 'auto'],
          px: ['8px', null, 0],
          justifyContent: ['space-between', null, 'flex-start'],
          position: 'relative'
        },
        Logo: {
          flex: '0 0 auto',
          variant: 'layout.SiteLogo'
        },
        CompanyLabel: {
          variant: 'layout.GradientText',
          background: 'linear-gradient(270deg, #945DD6 0%, #F46737 100%)',
          transition: 'opacity 0.2s',
          fontSize: ['12px', null, '13px', '15px'],
          textDecoration: 'none',
          flex: '0 0 auto',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
          py: ['4px', null, '8px', '10px'],
          ml: ['8px', null, '12px', '16px'],
          mr: 'auto',
          ':hover': {
            opacity: '0.8'
          }
        },
        Popup: {
          position: 'absolute',
          top: ['calc(100% + 10px)', null, 'calc(100% + 8px)'],
          right: 0,
          zIndex: '4',
          visibility: 'hidden',
          opacity: 0,
          transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
          Open: {
            visibility: 'visible',
            opacity: 1
          }
        },
        Link: {
          variant: 'links.nav',
          fontFamily: 'body',
          fontSize: ['15px', null, null, '20px'],
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: ['18px', null, null, '24px'],
          whiteSpace: 'nowrap',
          color: alpha('background', 0.7),
          py: ['10px', null, '12px'],
          ml: [null, null, '24px', '32px'],
          transition: 'color 0.25s',
          '&:hover': {
            color: 'background'
          }
        },
        NavButton: {
          variant: 'layout.Header.Nav.Link',
          border: 'none',
          backgroundColor: 'transparent',
          px: 0,
          display: 'flex',
          alignItems: 'flex-end',
          Active: {
            color: 'background'
          },
          '&:hover': {
            color: 'background',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          },
          Icon: {
            display: 'flex',
            ml: ['5px', null, null, '7px'],
            transform: 'translateY(-1px)',
            transition: 'opacity 0.25s',
            svg: {
              width: [null, null, null, '18px'],
              height: [null, null, null, '18px']
            }
          }
        },
        SocialIcons: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexShrink: 0,
          order: [null, null, 1],
          '>a': {
            p: ['8px', null, '8px', '12px'],
            ml: ['4px', null, null, '8px'],
            display: 'flex',
            alignItems: 'center',
            ':first-of-type': {
              ml: [null, null, '32px']
            },
            svg: {
              width: [null, null, null, '24px'],
              height: [null, null, null, '24px'],

              '&.small-svg': {
                width: ['18px', null, null, '26px'],
                height: ['18px', null, null, '26px']
              }
            }
          }
        },
        OtherTools: {
          order: [null, null, 1]
        },
        OtherToolsPopup: {
          variant: 'layout.Header.Nav.Popup',
          backgroundColor: '#443558',
          flexDirection: 'column',
          padding: '8px',
          width: ['244px', null, '296px', '320px'],
          borderRadius: '12px',
          Open: {
            variant: 'layout.Header.Nav.Popup.Open'
          },
          Link: {
            mt: ['4px', null, '8px'],
            borderRadius: '8px',
            display: 'grid',
            columnGap: ['8px', null, '12px', '16px'],
            pt: ['10px', null, '8px', '10px'],
            px: ['8px', null, null, '12px'],
            pb: ['10px', null, '12px', '16px'],
            gridTemplateColumns: 'auto auto',
            gridTemplateRows: 'auto auto',
            textDecoration: 'none',
            textAlign: 'left',
            transition: 'background-color 0.25s',
            '&:first-of-type': {
              mt: 0
            },
            'svg.title-icon': {
              marginLeft: '4px',
              marginBottom: '2px',
              width: '14px',
              height: '14px',
              opacity: 1
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              svg: {
                opacity: 1
              }
            },
            Icon: {
              width: ['24px', null, '32px', '36px'],
              height: ['24px', null, '32px', '36px'],
              gridRow: 'span 2',
              svg: {
                width: ['24px', null, '32px', '36px'],
                height: ['24px', null, '32px', '36px']
              }
            },
            Title: {
              color: '#fff',
              letterSpacing: '0.02em',
              fontSize: ['14px', null, '16px', '18px'],
              lineHeight: ['16px', null, '24px', '30px'],
              display: 'flex',
              alignItems: 'center',
              svg: {
                ml: '10px',
                opacity: 0,
                transition: 'opacity 0.25s'
              }
            },
            Description: {
              letterSpacing: '0.02em',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: ['12px', null, '14px', '16px'],
              lineHeight: ['16px', null, '18px', '22px']
            }
          }
        },
        InstallPopup: {
          variant: 'layout.Header.Nav.Popup',
          right: ['calc(50% - 150px)', 'calc(50% - 160px)', 0],
          width: ['300px', '320px', '350px'],
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          p: '24px',
          backgroundColor: '#FFF',
          borderRadius: '8px',
          boxShadow:
            '0px 8px 16px rgba(46, 49, 55, 0.15), 0px 0px 2px rgba(46, 49, 55, 0.2)',
          fontSize: '15px',
          fontFamily: 'body',
          Open: {
            variant: 'layout.Header.Nav.Popup.Open'
          },
          h2: {
            color: '#2E3137',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '1.33',
            textAlign: 'left'
          },
          CopiedText: {
            color: '#38A169',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '1.33',
            visibility: 'none',
            opacity: 0,
            transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
            Active: {
              visibility: 'visible',
              opacity: 1
            }
          },
          code: {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#2E3137',
            border: '1px solid #ECECEC',
            backgroundColor: '#F3F3F3',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '15px',
            lineHeight: '1.33',
            fontFamily: 'monospace',
            py: '6px',
            px: '12px',
            my: '16px'
          },
          CopyBtn: {
            p: 0,
            width: '16px',
            height: '16px',
            background: 'transparent',
            display: 'flex',
            path: {
              transition: '0.2s ease-in-out fill'
            },
            '&:hover': {
              cursor: 'pointer'
            },
            '&:focus': {
              outline: 'none'
            },
            '&:hover path': {
              fill: '#515661'
            },
            '&:focus path': {
              fill: '#6F7685'
            },
            '>p': {
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: '1px',
              overflow: 'hidden',
              position: 'absolute',
              whiteSpace: 'nowrap',
              width: '1px'
            }
          },
          Link: {
            color: '#7A818F',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '1.87',
            textDecoration: 'none',
            transition: '0.2s ease-in-out color',
            ':hover': {
              color: '#1197AE'
            },
            ':focus': {
              color: '#13ADC7'
            }
          },
          OkBtn: {
            borderRadius: '4px',
            height: '28px',
            px: '12px',
            py: 0,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '1.87',
            width: 'auto',
            backgroundColor: '#13ADC7',
            transition: '0.2s ease-in-out background-color',
            ':hover': {
              backgroundColor: '#1197AE',
              cursor: 'pointer'
            },
            ':focus': {
              outline: 'none',
              backgroundColor: '#13ADC7'
            }
          }
        }
      }
    },
    Footer: {
      variant: 'styles.invert',
      py: 1,
      Inner: {
        flexDirection: ['column', null, null, 'row'],
        flexWrap: ['nowrap', null, null, 'wrap'],
        alignItems: 'start',
        variant: 'layout.container',
        mx: 'auto',
        maxWidth: '1280px',
        px: ['16px', null, '32px', '80px'],
        py: ['16px', null, '24px', '40px'],
        pb: ['12px', null, '24px', '40px'],
        display: ['block', null, null, 'flex']
      },
      Logo: {
        variant: 'layout.SiteLogo',
        mr: '80px',
        mb: [null, null, '26px'],
        width: [87, null, 98, 113],
        height: [32, null, 36, 40],
        span: {
          display: 'block',
          mr: 'auto',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: [32, null, 36, 40],
          height: [32, null, 36, 40]
        },
        svg: {
          width: [46, null, 52, 58],
          height: [16, null, 18, 26]
        }
      },
      Lists: {
        justifyContent: ['space-between', null, 'flex-start'],
        flexWrap: ['wrap', null, 'nowrap'],
        width: ['100%', null, null, 'initial']
      },
      List: {
        flexDirection: 'column',
        width: ['calc(50% - 12px)', null, 'initial'],
        mr: [null, null, '56px', '84px'],
        mt: ['20px', null, 0],
        p: 0,
        Title: {
          fontSize: '14px',
          lineHeight: '26px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          color: 'rgba(255, 255, 255, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          mb: ['2px', null, '6px']
        },
        Link: {
          variant: 'links.footerNav',
          py: '4px',
          fontSize: ['16px', null, null, '18px'],
          lineHeight: ['28px', null, null, '30px'],
          display: 'flex',
          alignItems: 'center',
          letterSpacing: '0.02em',
          'svg, span': {
            mr: ['8px', null, '10px', '12px'],
            width: ['16px', null, '18px', '20px'],
            height: ['16px', null, '18px', '20px'],
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }
        }
      },
      CompanyLabel: {
        fontSize: '20px',
        lineHeight: '32px',
        display: 'flex',
        flexDirection: ['column', null, 'row'],
        alignItems: 'center',
        justifyContent: ['center', null, null, 'flex-start'],
        mt: ['32px', null, '48px', '32px'],
        alignSelf: 'center',
        mr: [null, null, null, 'auto'],
        a: {
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          ':hover': {
            opacity: '0.8',
            cursor: 'pointer'
          }
        },
        Line: {
          '&:first-of-type': {
            display: 'flex',
            alignItems: 'center',
            svg: {
              ml: ['6px', null, '3px'],
              mr: ['4px', null, '3px']
            }
          },
          '&:nth-of-type(2)': {
            fontSize: ['14px', null, '18px'],
            lineHeight: ['20px', null, '30px'],
            '& span': {
              display: ['none', null, 'inline'],
              ml: '7px'
            }
          }
        }
      },
      SocialIcons: {
        justifyContent: ['center', null, null, 'flex-end'],
        alignItems: 'center',
        textAlign: ['center', null, null, 'right'],
        mx: ['auto', null, null, 'initial'],
        mt: ['16px', null, null, '32px'],
        '>a': {
          variant: 'styles.SocialLinkIcon',
          p: '12px',
          ml: ['8px', null, '24px'],
          ':first-of-type': {
            ml: 0
          }
        }
      }
    },
    main: {
      overflow: 'auto'
    }
  },
  buttons: {
    base: {
      transition: '0.2s background-color',
      display: 'inline-block',
      textDecoration: 'none',
      borderRadius: '30px',
      px: 1
    },
    primary: {
      variant: 'buttons.base',
      lineHeight: '50px',
      fontSize: '18px',
      letterSpacing: '0.02em',
      height: '50px',
      backgroundColor: 'primary',
      color: 'white',
      border: 'none',
      px: '2em',
      cursor: 'pointer',
      '&:hover': {
        bg: 'purple.2'
      }
    }
  },
  copy: {
    variant: 'buttons.base',
    cursor: 'pointer',
    py: 0,
    fontSize: '14px',
    height: '30px',
    width: '86px',
    color: 'white',
    backgroundColor: '#24ADC5',
    '&:hover': {
      backgroundColor: '#2698AB'
    },
    '&:disabled': {
      opacity: '0.4'
    },
    '&:focus': {
      border: '1px solid #4A3F63',
      outline: 'none'
    }
  },
  links: {
    primary: {
      transition: '0.2s color'
    },
    button: {
      variant: 'buttons.primary'
    },
    nav: {
      variant: 'links.light',
      fontWeight: 'normal',
      textDecoration: 'none'
    },
    light: {
      variant: 'links.primary',
      color: alpha('background', 0.7),
      ':focus': {
        color: alpha('background', 0.85)
      },
      '&:hover': {
        color: 'background'
      }
    },
    footerNav: {
      variant: 'links.nav',
      color: alpha('background', 0.75),
      '&:hover': {
        color: 'background'
      },
      ':focus': {
        color: alpha('background', 0.75)
      }
    },
    RepoButton: {
      variant: 'buttons.base',
      textAlign: 'center',
      width: '96px',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '95px',
      color: 'background',
      border: '1px solid',
      borderColor: alpha('background', 0.3),
      height: '30px',
      py: '8px',
      px: '6px',
      mx: '4px',
      fontSize: '14px',
      textDecoration: 'none',
      letterSpacing: '0.01em',
      '&:hover': {
        backgroundColor: alpha('background', 0.3)
      },
      '&:focus': {
        outline: 'none',
        borderColor: 'background'
      },
      '&:disabled': {
        color: alpha('background', 0.5)
      },
      '&>svg, &>img': {
        color: alpha('background', 0.6)
      },
      '>span': {
        display: 'inline-block',
        flex: '1 1'
      }
    }
  },
  forms: {
    input: {
      color: 'text'
    },
    partial: {
      border: 'none',
      backgroundColor: 'unset'
    },
    ButtonInput: {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '1.5rem',
      pr: '2px',
      fontSize: '18px',
      Input: {
        variant: 'forms.partial',
        pl: '1rem',
        borderTopLeftRadius: '1.5rem',
        borderBottomLeftRadius: '1.5rem',
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1
      },
      Button: {
        my: '2px',
        color: 'white',
        backgroundColor: 'purple',
        borderRadius: '1.5rem',
        lineHeight: '1.5rem',
        flex: '0 0 auto',
        letterSpacing: '0.02em'
      }
    }
  },
  switches: {
    Base: {
      position: 'relative',
      '::before': {
        border: '1px solid',
        borderColor: 'text',
        backgroundColor: 'background',
        transition: '0.1s all',
        position: 'absolute',
        display: 'block',
        borderRadius: 1,
        content: "''",
        bottom: '0',
        top: '0'
      },
      Left: {
        '::before': {
          left: '0',
          right: '66%'
        }
      },
      Center: {
        '::before': {
          left: '33%',
          right: '33%'
        }
      },
      Right: {
        '::before': {
          left: '66%',
          right: '0'
        }
      },
      Label: {
        variant: 'styles.NoClickOutline'
      },
      '>span': {
        variant: 'switches.Base.Label'
      }
    },
    primary: {
      variant: 'switches.Base',
      display: 'block',
      whiteSpace: 'nowrap',
      color: 'background',
      bg: 'darkPurple.1',
      borderRadius: 1,
      width: '100%',
      overflow: 'hidden',
      Label: {
        variant: 'switches.Base.Label',
        py: 1,
        px: 2,
        zIndex: '3',
        width: '33%',
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
        transition: '0.2s all',
        cursor: 'pointer',
        Active: {
          color: 'text'
        }
      }
    }
  },
  styles: {
    ...preset.styles,
    SocialLinkIcon: {
      variant: 'links.footerNav'
    },
    LandingVideo: {
      height: '0',
      width: 'auto',
      paddingBottom: '56.25%',
      borderRadius: '8px',
      backgroundColor: 'black',
      overflow: 'hidden',
      my: 3
    },
    HomeFeature: {
      Wrapper: {
        borderTopStyle: ['solid', null, null, 'none'],
        borderLeftStyle: ['none', null, null, 'solid'],
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.3)',
        mx: 'auto',
        px: [1, null, '35px'],
        py: '1px',
        maxWidth: '600px',
        svg: {
          mb: ['20px', null, null, '30px']
        },
        '&:first-of-type': {
          borderTop: 'none',
          borderLeft: 'none',
          pl: '30px'
        },
        '&:last-of-type': {
          pr: '30px'
        }
      },
      Heading: {
        my: 3,
        fontSize: '22px',
        lineHeight: '32px'
      },
      Content: {
        color: alpha('background', 0.5),
        fontSize: '18px',
        lineHeight: '28px',
        letterSpacing: '0.02em'
      },
      Box: {
        maxWidth: '500px',
        my: ['40px', null, null, '25px'],
        mx: 'auto'
      }
    },
    Highlight: {
      textDecoration: 'inherit',
      transition: '0.2s all',
      display: 'block',
      width: 'auto',
      mr: 'auto',
      color: 'inherit',
      '&>div>span': {
        transition: '0.2s all',
        borderRadius: '2px',
        py: '0.03em',
        my: '-0.03em',
        px: '0.25em',
        mx: '-0.25em'
      }
    },
    Tooltip: {
      Base: {
        transition: '0.2s all ease-in-out',
        display: 'block',
        visibility: 'hidden',
        transform: 'translateX(-50%)',
        position: 'absolute',
        opacity: '0'
      },
      Bubble: {
        variant: 'styles.Tooltip.Base',
        backgroundColor: 'background',
        color: 'text',
        width: 'auto',
        height: '44px',
        fontFamily: 'body',
        fontSize: ['14px', null, '18px'],
        top: '-54px',
        px: '1em',
        lineHeight: '44px',
        borderRadius: '4px',
        whiteSpace: 'nowrap'
      },
      Arrow: {
        variant: 'styles.Tooltip.Base',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid',
        borderTopColor: 'background',
        content: '""',
        top: '-10px',
        height: '0',
        width: '0'
      },
      Active: {
        visibility: 'visible',
        opacity: '1'
      }
    },
    CenteredBlock: {
      display: 'block',
      mx: 'auto'
    },
    CodeBlock: {
      fontSize: ['12px', null, null, '14px'],
      lineHeight: ['18px', null, null, '22px'],
      overflow: 'auto',
      px: '10px',
      py: '10px',
      Buttons: {
        my: ['10px', '15px', '20px'],
        mr: ['10px', '15px', '20px'],
        justifyContent: 'flex-end'
      },
      pre: {
        minWidth: '100%',
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        display: 'inline-block',
        pt: '10px',
        pl: '10px',
        pb: '15px',
        borderBottomLeftRadius: 1,
        minHeight: '100%',
        marginBottom: '-10px',
        '&>div': {
          float: 'left',
          clear: 'both'
        }
      }
    },
    Video: {
      borderRadius: 1
    },
    invert: {
      color: alpha('background', 0.5),
      backgroundColor: 'text'
    },
    SolutionList: {
      p: 0,
      listStyle: 'none',
      color: 'text',
      fontSize: ['12px', null, '16px', '22px'],
      lineHeight: '32px',
      maxWidth: [null, '586px', '834px'],
      Item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        borderTop: '1px solid',
        borderColor: alpha('#4A3F63', 0.2),
        alignItems: 'center',
        ':first-of-type': { borderTop: 'none' },
        '&>h3': {
          color: 'text',
          flex: 1,
          ':first-of-type': { textAlign: 'left' },
          ':last-of-type': { textAlign: 'right' }
        },
        '&>svg': {
          minWidth: '60px',
          maxHeight: '24px',
          height: '100%',
          flex: '0 0 auto'
        }
      }
    },
    Tabs: {
      Wrapper: {
        color: 'white',
        minWidth: '250px',

        display: 'flex',
        flexFlow: 'column nowrap',
        overflow: 'visible',
        width: '100%',

        px: [0, null, 3]
      },

      Tabs: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: ['column', null, 'row']
      },

      Content: {
        variant: 'styles.Tabs.Content.Inactive',
        order: 1,
        overflow: 'hidden',
        borderBottomRightRadius: [0, null, 1],
        borderBottomLeftRadius: [0, null, 1],
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        Inactive: {
          display: 'none'
        },
        Active: {
          display: 'block',
          width: '100%',
          height: 'auto',
          flex: [null, null, '1 1 100%'],
          boxShadow: [null, 'wide'],
          textAlign: 'left'
        }
      },

      Label: {
        variant: 'styles.NoClickOutline',
        flex: '1 0',
        marginRight: [0, null, '2px'],
        height: ['48px', null, null, '70px'],
        lineHeight: ['48px', null, null, '70px'],
        px: [4, 2],
        color: 'white',
        backgroundColor: 'darkPurple.0',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderTopLeftRadius: [0, null, 1],
        borderTopRightRadius: [0, null, 1],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        opacity: 0.5,
        fontWeight: '800',
        cursor: 'pointer',
        zIndex: '5',
        position: 'relative',
        fontSize: '18px',
        display: 'block',

        order: '0',

        borderBottom: 'none',

        verticalAlign: 'middle',

        transition: 'opacity 0.2s',
        ':last-of-type': {
          mr: 0
        },

        '&:hover': {
          opacity: 0.7
        },
        Active: {
          opacity: 1
        }
      }
    },

    NoClickOutline: {
      outline: 'none'
    },

    root: {
      ...preset.styles.root,
      color: alpha('text', 0.7),
      minWidth: '350px',
      fontSize: '14px',
      '*': {
        boxSizing: 'border-box'
      },
      '&, #___gatsby, #gatsby-focus-wrapper': {
        height: '100%',
        width: '100%',
        padding: '0',
        margin: '0'
      }
    }
  }
}
