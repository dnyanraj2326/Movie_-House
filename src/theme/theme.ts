interface Spacing{
    space_2:number;
    space_4:number;
    space_8:number;
    space_10:number;
    space_12:number;
    space_14:number;
    space_16:number;
    space_18:number;
    space_20:number;
    space_22:number;
    space_24:number;
    space_28:number;
    space_32:number;
    space_36:number;
}

export const SPACING:Spacing = {
    space_2:2,
    space_4:4,
    space_8:8,
    space_10:10,
    space_12:12,
    space_14:14,
    space_16:16,
    space_18:18,
    space_20:20,
    space_22:22,
    space_24:24,
    space_28:28,
    space_32:32,
    space_36:36,
};

interface Color{
    Black:string;
    BlackRGB10:string;
    Orange:string;
    OrangeRGB10:string;
    Gray:string;
    DarkGray:string;
    Yellow:string;
    White:string;
    WhiteRGBA75:string;
    WhiteRGBA50:string;
    WhiteRGBA32:string;
    WhiteRGBA15:string;
}

export const COLOR : Color = {
    Black:"#000000",
    BlackRGB10:'rgba(0,0,0,0.1)',
    Orange:'#ff5524',
    OrangeRGB10:'rgba(255,85,36,0)',
    Gray:'#333333',
    DarkGray:'#0b0b0b',
    Yellow:'#e1cd17',
    White:'#ffffff',
    WhiteRGBA75:'rgba(255,255,255,0.75)',
    WhiteRGBA50:'rgba(255,255,255,0.50)',
    WhiteRGBA32:'rgba(255,255,255,0.32)',
    WhiteRGBA15:'rgba(255,255,255,0.15)',
};

interface FontFamily{
    poppins_black:string;
    poppins_bold:string;
    poppins_extrabold:string;
    poppins_extralight:string;
    poppins_light:string;
    poppins_medium:string;
    poppins_regular:string;
    poppins_semibold:string;
    poppins_thin:string;
}

export const FONTFAMILY : FontFamily = {
    poppins_black:'Poppins-Black',
    poppins_bold:'Poppins-Bold',
    poppins_extrabold:'Poppins-ExtraBold',
    poppins_extralight:'Poppins-ExtraLight',
    poppins_light:'Poppins-Light',
    poppins_medium:'Poppins-Medium',
    poppins_regular:'Poppins-Regular',
    poppins_semibold:'Poppins-SemiBold',
    poppins_thin:'Poppins-Thin',
};

interface Fontsize{
    size_8:number;
    size_10:number;
    size_12:number;
    size_14:number;
    size_16:number;
    size_18:number;
    size_20:number;
    size_24:number;
    size_30:number;
}

export const FONTSIZE : Fontsize = {
    size_8:8,
    size_10:10,
    size_12:12,
    size_14:14,
    size_16:16,
    size_18:18,
    size_20:20,
    size_24:24,
    size_30:30,
};

interface BorderRadius {
    redius_4:number;
    redius_8:number;
    redius_10:number;
    redius_15:number;
    redius_20:number;
    redius_25:number;
}

export const BORDERRADIUS : BorderRadius ={
    redius_4:4,
    redius_8:8,
    redius_10:10,
    redius_15:15,
    redius_20:20,
    redius_25:25,
}