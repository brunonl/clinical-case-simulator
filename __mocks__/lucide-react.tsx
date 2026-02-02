
import React from 'react';

// Mock genérico que retorna um SVG vazio para qualquer ícone importado
const IconMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg ref={ref} {...props} data-testid="lucide-icon" />
));

IconMock.displayName = 'IconMock';

export const Home = IconMock;
export const FileUser = IconMock;
export const BarChart2 = IconMock;
export const Info = IconMock;
export const HelpCircle = IconMock;
export const ChevronLeft = IconMock;
export const ChevronRight = IconMock;
export const Menu = IconMock;
export const CheckCircle = IconMock;
export const XCircle = IconMock;
export const User = IconMock;
export const LogOut = IconMock;
export const Stethoscope = IconMock;
export const Grid = IconMock;
export const LayoutGrid = IconMock;
export const Zap = IconMock;
export const TrendingUp = IconMock;
export const Trophy = IconMock;
export const Target = IconMock;
export const Activity = IconMock;
export const Loader2 = IconMock;
export const ArrowLeft = IconMock;
export const ArrowRight = IconMock;
export const Copy = IconMock;
export const CheckCircle2 = IconMock;

// Fallback para qualquer outro named export
export default IconMock;
